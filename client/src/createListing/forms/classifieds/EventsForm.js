/**
 * @Author:     Alex Qin
 * @Created:    2021.2.12
 *
 * @Description: Form to create a listing in Classes, Clubs & Events category
 *
 */

import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import TextArea from "../../../common/forms/TextArea";
import LargeTextArea from "../../../common/forms/LargeTextArea";
import SubmitButton from "../../../common/forms/SubmitButton";
import {SHORT_DESC_CHAR_COUNT} from "../../../common/constants/listingsConstants";
import {
    checkIfErrorsExistInMapping,
    validateInput, validatePhoneNumber
} from "../../../registration/registrationUtils";
import {Events_TEXT as TEXT} from "./constants/ClassifiedsListingText";
import Tooltip from "../../../common/forms/Tooltip";
import {CREATE_LISTING_MEMBER_SHARE_HOME as ToolTipText} from "../../../common/constants/TooltipText";
import PhoneNumInput from "../../../common/forms/PhoneNumInput";
import MultiImageUpload from "../../../common/forms/MultiImageUpload";
import {DEFAULT_MAX_NUM_IMAGES} from "../../constants/createListingConfig";
import {LISTING_FIELD_LENGTHS} from "../../../common/constants/fieldLengths";
import {translatePhoneNumberIntToThreeStrings} from "../../../common/utils/stringUtils";

const EventsForm = (props) => {
    const {
        onSubmit,
        listingExists = false,
        existingTitle,
        existingShortDescription,
        existingFullDescription,
        existingRateAndFees,
        existingContactName,
        existingContactPhoneNumber,
        existingEventDateTime
    } = props;

    const [title, setTitle] = useState(existingTitle || undefined);
    const [shortDescription, setShortDescription] = useState(existingShortDescription || undefined);
    const [fullDescription, setFullDescription] = useState(existingFullDescription || undefined);
    const [rateAndFees, setRateAndFees] = useState(existingRateAndFees || undefined);
    const [pictures, setPictures] = useState(undefined);
    const [contactName, setContactName] = useState(existingContactName || undefined);
    const [contactPhoneNumber, setContactPhoneNumber] = useState(listingExists
        ? translatePhoneNumberIntToThreeStrings(existingContactPhoneNumber)
        : undefined
    );
    const [eventDateTime, setEventDateTime] = useState(existingEventDateTime || undefined);

    const [submitted, setSubmitted] = useState(false);

    const [titleError, setTitleError] = useState(undefined);
    const [shortDescriptionError, setShortDescriptionError] = useState(undefined);
    const [fullDescriptionError, setFullDescriptionError] = useState(undefined);
    const [rateAndFeeError, setRateAndFeeError] = useState(undefined);
    const [contactNameError, setContactNameError] = useState(undefined);
    const [contactPhoneNumberError, setContactPhoneNumberError] = useState(undefined);
    const [dateAndTimeError, setDateAndTimeError] = useState(undefined);

    useEffect(() => {
        title !== undefined && validateInput(title, setTitleError);
    }, [title]);
    useEffect(() => {
        shortDescription !== undefined && validateInput(shortDescription, setShortDescriptionError);
    }, [shortDescription]);
    useEffect(() => {
        fullDescription !== undefined && validateInput(fullDescription, setFullDescriptionError);
    }, [fullDescription]);
    useEffect(() => {
        rateAndFees !== undefined && validateInput(rateAndFees, setRateAndFeeError);
    }, [rateAndFees]);
    useEffect(() => {
        contactName !== undefined && validateInput(contactName, setContactNameError);
    }, [contactName]);
    useEffect(() => {
        contactPhoneNumber !== undefined && validatePhoneNumber(contactPhoneNumber, setContactPhoneNumberError);
    }, [contactPhoneNumber]);
    useEffect(() => {
        eventDateTime !== undefined && validateInput(eventDateTime, setDateAndTimeError);
    }, [eventDateTime]);

    function handleImageUpload(e) {
        setPictures([...e.target.files]);
    }

    const isFormValid = () => {

        const errors = {
            title: false,
            shortDes: false,
            fullDes: false,
            rateFee: false,
            contactName: false,
            contactPhoneNumber: false,
            dateAndTime: false
        }

        errors.title = validateInput(title, setTitleError);
        errors.shortDes = validateInput(shortDescription, setShortDescriptionError);
        errors.fullDes = validateInput(fullDescription, setFullDescriptionError);
        errors.rateFee = validateInput(rateAndFees, setRateAndFeeError);
        errors.contactName = validateInput(contactName, setContactNameError);
        errors.contactPhoneNumber = validatePhoneNumber(contactPhoneNumber, setContactPhoneNumberError);
        errors.dateAndTime = validateInput(eventDateTime, setDateAndTimeError)

        return !(checkIfErrorsExistInMapping(errors));
    }

    //function for input checks on submit
    function onCreateListing() {
        if (isFormValid()) {
            setSubmitted(true);
            onSubmit({
                title,
                shortDescription,
                fullDescription,
                rateAndFees,
                contactName,
                contactPhoneNumber,
                eventDateTime,
                pictures
            });
        }
    }

    function handleContactPhoneChange(e) {
        const value = e.target.value;
        setContactPhoneNumber({
            ...contactPhoneNumber,
            [e.target.name]: value
        });
    }

    return (
        <div>
            <div className="col-start-1 col-end-7 py-5 px-5 m-6 bg-white shadow-lg rounded-xl">
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                        <h1 className={"page-title mb-5"}> {TEXT.form_title} </h1>
                        <TextArea
                            className={`${titleError && "border-red-500"} input`}
                            label={TEXT.title}
                            labelClassName={"label"}
                            required={true}
                            onChange={(e) => setTitle(e.target.value)}
                            value={title || ''}
                            disabled={submitted}
                            charLimit={LISTING_FIELD_LENGTHS.TITLE}
                        />
                        <div className={"grid grid-cols-9"}>
                            <section className={"col-start-1 col-end-5"}>
                                <TextArea
                                    className={`${shortDescriptionError && "border-red-500"} input`}
                                    label={TEXT.short_des + " (" + SHORT_DESC_CHAR_COUNT + " Characters)"}
                                    labelClassName={"label"}
                                    required={true}
                                    onChange={(e) => setShortDescription(e.target.value)}
                                    value={shortDescription || ''}
                                    charLimit={SHORT_DESC_CHAR_COUNT}
                                    disabled={submitted}
                                />
                            </section>
                            <section className={"col-start-6 col-end-10"}>
                                <TextArea
                                    className={`${contactNameError && "border-red-500"} input`}
                                    label={TEXT.contactName}
                                    labelClassName={"label"}
                                    required={true}
                                    onChange={(e) => setContactName(e.target.value)}
                                    value={contactName || ''}
                                    disabled={submitted}
                                    charLimit={LISTING_FIELD_LENGTHS.CONTACT_NAME}
                                />
                            </section>
                            <section className={"col-start-1 col-end-5"}>
                                <TextArea
                                    className={`${rateAndFeeError && "border-red-500"} input`}
                                    label={TEXT.rateAndFees}
                                    labelClassName={"label"}
                                    required={true}
                                    onChange={(e) => setRateAndFees(e.target.value)}
                                    value={rateAndFees || ''}
                                    disabled={submitted}
                                    charLimit={LISTING_FIELD_LENGTHS.RATES_AND_FEES}
                                />
                            </section>
                            <section className={"col-start-6 col-end-10"}>
                                <PhoneNumInput
                                    className={`${contactPhoneNumberError && "border-red-500"} phone`}
                                    required={true}
                                    value={contactPhoneNumber || {}}
                                    labelClassName={"label"}
                                    label={TEXT.contactPhoneNumber}
                                    onChange={handleContactPhoneChange}
                                />
                            </section>
                            <section className={"col-start-1 col-end-5"}>
                                <TextArea
                                    className={`${dateAndTimeError && "border-red-500"} input`}
                                    label={TEXT.eventDateTime}
                                    labelClassName={"label"}
                                    required={true}
                                    onChange={(e) => setEventDateTime(e.target.value)}
                                    value={eventDateTime || ''}
                                    disabled={submitted}
                                    charLimit={LISTING_FIELD_LENGTHS.EVENT_DATE_TIME}
                                />
                            </section>
                        </div>
                        <LargeTextArea
                            className={`${fullDescriptionError && "border-red-500"} input`}
                            rows={"6"}
                            label={TEXT.full_des}
                            labelClassName={"label"}
                            required={true}
                            onChange={(e) => setFullDescription(e.target.value)}
                            value={fullDescription || ''}
                            disabled={submitted}
                            charLimit={LISTING_FIELD_LENGTHS.FULL_DESCRIPTION}
                        />
                        {!listingExists &&
                        <div>
                            <label className="label"> {TEXT.pictures} </label>
                            <Tooltip
                                text={ToolTipText.PHOTOS}
                                toolTipID={"UploadPhotos"}
                            />
                            <MultiImageUpload handleImageUpload={handleImageUpload} maxNumImages={DEFAULT_MAX_NUM_IMAGES}/>
                        </div>
                        }
                    </div>
                </div>
            </div>
            <SubmitButton
                className={"btn btn-green form-btn w-1/2"}
                onClick={onCreateListing}
            />
        </div>
    );
}

EventsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    listingExists: PropTypes.bool,
    existingTitle: PropTypes.string,
    existingShortDescription: PropTypes.string,
    existingFullDescription: PropTypes.string,
    existingRateAndFees: PropTypes.string,
    existingContactName: PropTypes.string,
    existingContactPhoneNumber: PropTypes.number,
    existingEventDateTime: PropTypes.string
}

export default EventsForm;