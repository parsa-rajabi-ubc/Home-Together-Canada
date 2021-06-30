/**
 * @Author:     Jeff Hatton
 * @Created:    2021.02.10
 *
 * @Description: Form to create a listing in Government services category
 *
 */

import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {GOVERNMENT_SERVICES_TEXT as TEXT} from "./constants/ServiceListingText";
import TextArea from "../../../common/forms/TextArea";
import LargeTextArea from "../../../common/forms/LargeTextArea";
import SubmitButton from "../../../common/forms/SubmitButton";
import {SHORT_DESC_CHAR_COUNT} from "../../../common/constants/listingsConstants";
import {
    checkIfErrorsExistInMapping,
    validateInput, validatePhoneNumber
} from "../../../registration/registrationUtils";
import PhoneNumInput from "../../../common/forms/PhoneNumInput";
import {LISTING_FIELD_LENGTHS} from "../../../common/constants/fieldLengths";
import {translatePhoneNumberIntToThreeStrings} from "../../../common/utils/stringUtils";

const GovernmentServicesForm = (props) => {
    const {
        onSubmit,
        listingExists = false,
        existingTitle,
        existingShortDescription,
        existingFullDescription,
        existingContactName,
        existingContactPhoneNumber
    } = props;

    const [title, setTitle] = useState(existingTitle || undefined);
    const [shortDescription, setShortDescription] = useState(existingShortDescription || undefined);
    const [contactName, setContactName] = useState(existingContactName || undefined);
    const [contactPhoneNumber, setContactPhoneNumber] = useState(listingExists
        ? translatePhoneNumberIntToThreeStrings(existingContactPhoneNumber)
        : undefined
    );
    const [fullDescription, setFullDescription] = useState(existingFullDescription || undefined);


    const [titleError, setTitleError] = useState(undefined);
    const [shortDescriptionError, setShortDescriptionError] = useState(undefined);
    const [contactNameError, setContactNameError] = useState(undefined);
    const [contactPhoneNumberError, setContactPhoneNumberError] = useState(undefined);
    const [fullDescriptionError, setFullDescriptionError] = useState(undefined);

    useEffect(() => {
        title !== undefined && validateInput(title, setTitleError);
    }, [title]);
    useEffect(() => {
        shortDescription !== undefined && validateInput(shortDescription, setShortDescriptionError);
    }, [shortDescription]);
    useEffect(() => {
        contactName !== undefined && validateInput(contactName, setContactNameError);
    }, [contactName]);
    useEffect(() => {
        contactPhoneNumber !== undefined && validatePhoneNumber(contactPhoneNumber, setContactPhoneNumberError);
    }, [contactPhoneNumber]);
    useEffect(() => {
        fullDescription !== undefined && validateInput(fullDescription, setFullDescriptionError);
    }, [fullDescription]);

    const isFormValid = () => {

        const errors = {
            title: false,
            shortDes: false,
            contactName: false,
            contactPhoneNumber: false,
            fullDes: false
        }

        errors.title = validateInput(title, setTitleError);
        errors.shortDes = validateInput(shortDescription, setShortDescriptionError);
        errors.contactName = validateInput(contactName, setContactNameError);
        errors.contactPhoneNumber = validatePhoneNumber(contactPhoneNumber, setContactPhoneNumberError);
        errors.fullDes = validateInput(fullDescription, setFullDescriptionError);

        return !(checkIfErrorsExistInMapping(errors));
    }

    //function for input checks on submit
    function onCreateListing() {
        if (isFormValid()) {
            onSubmit({
                title,
                shortDescription,
                contactName,
                contactPhoneNumber,
                fullDescription,
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
                            charLimit={LISTING_FIELD_LENGTHS.TITLE}
                        />
                        <div className={"grid grid-cols-9 gap-x-6"}>
                            <section className={"col-start-1 col-end-5"}>
                                <TextArea
                                    className={`${shortDescriptionError && "border-red-500"} input`}
                                    label={TEXT.short_des + " (" + SHORT_DESC_CHAR_COUNT + " Characters)"}
                                    labelClassName={"label"}
                                    required={true}
                                    onChange={(e) => setShortDescription(e.target.value)}
                                    value={shortDescription || ''}
                                    charLimit={SHORT_DESC_CHAR_COUNT}
                                />
                            </section>
                            <section className={"col-start-1 col-end-5"}>
                                <TextArea
                                    className={`${contactNameError && "border-red-500"} input`}
                                    label={TEXT.contact_name}
                                    labelClassName={"label"}
                                    required={true}
                                    onChange={(e) => setContactName(e.target.value)}
                                    value={contactName || ''}
                                    charLimit={LISTING_FIELD_LENGTHS.CONTACT_NAME}
                                />
                            </section>
                            <section className={"col-start-1 col-end-5"}>
                                <PhoneNumInput
                                    className={`${contactPhoneNumberError && "border-red-500"} phone`}
                                    required={true}
                                    value={contactPhoneNumber || {}}
                                    labelClassName={"label"}
                                    label={TEXT.contact_phone_number}
                                    onChange={handleContactPhoneChange}
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
                            charLimit={LISTING_FIELD_LENGTHS.FULL_DESCRIPTION}
                        />
                    </div>
                </div>
                <SubmitButton
                    className={"btn btn-green form-btn w-1/2"}
                    onClick={onCreateListing}
                />
            </div>
        </div>
    );
}
GovernmentServicesForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    listingExists: PropTypes.bool,
    existingTitle: PropTypes.string,
    existingShortDescription: PropTypes.string,
    existingFullDescription: PropTypes.string,
    existingContactName: PropTypes.string,
    existingContactPhoneNumber: PropTypes.number
}

export default GovernmentServicesForm;