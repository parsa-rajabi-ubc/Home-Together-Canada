/**
 * @Author:     Alex Qin
 * @Created:    2021.02.12
 *
 * @Description: Form to create a listing in House and Yard Services category in Classifieds
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
    validateInput
} from "../../../registration/registrationUtils";
import {HOUSE_YARD_TEXT as TEXT} from "./constants/ClassifiedsListingText";
import Tooltip from "../../../common/forms/Tooltip";
import {CREATE_LISTING_MEMBER_SHARE_HOME as ToolTipText} from "../../../common/constants/TooltipText";
import MultiImageUpload from "../../../common/forms/MultiImageUpload";
import {DEFAULT_MAX_NUM_IMAGES} from "../../constants/createListingConfig";
import {LISTING_FIELD_LENGTHS} from "../../../common/constants/fieldLengths";

const HouseServicesForm = (props) => {
    const {
        onSubmit,
        listingExists = false,
        existingTitle,
        existingShortDescription,
        existingFullDescription,
        existingRateAndFees
    } = props;

    const [title, setTitle] = useState(existingTitle || undefined);
    const [shortDescription, setShortDescription] = useState(existingShortDescription || undefined);
    const [fullDescription, setFullDescription] = useState(existingFullDescription || undefined);
    const [rateAndFees, setRateAndFees] = useState(existingRateAndFees || undefined);
    const [pictures, setPictures] = useState(undefined);

    const [submitted, setSubmitted] = useState(false);

    const [titleError, setTitleError] = useState(undefined);
    const [shortDescriptionError, setShortDescriptionError] = useState(undefined);
    const [fullDescriptionError, setFullDescriptionError] = useState(undefined);
    const [rateAndFeeError, setRateAndFeeError] = useState(undefined);

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

    function handleImageUpload(e) {
        setPictures([...e.target.files]);
    }

    const isFormValid = () => {

        const errors = {
            title: false,
            shortDes: false,
            fullDes: false,
            rateFee: false
        }

        errors.title = validateInput(title, setTitleError);
        errors.shortDes = validateInput(shortDescription, setShortDescriptionError);
        errors.fullDes = validateInput(fullDescription, setFullDescriptionError);
        errors.rateFee = validateInput(rateAndFees,setRateAndFeeError);

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
                pictures
            });
        }
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
                <SubmitButton
                    className={"btn btn-green form-btn w-1/2"}
                    onClick={onCreateListing}
                />
            </div>
        </div>
    );
}
HouseServicesForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    listingExists: PropTypes.bool,
    existingTitle: PropTypes.string,
    existingShortDescription: PropTypes.string,
    existingFullDescription: PropTypes.string,
    existingRateAndFees: PropTypes.string,
}

export default HouseServicesForm;