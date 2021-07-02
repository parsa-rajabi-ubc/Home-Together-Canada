/**
 * @Author:     Jeff Hatton
 * @Created:    2021.02.10
 *
 * @Description: Form to create a listing in Home Share Facilitation & Supporting Services
 * and Home Sharing Businesses, Groups and Organizations categories
 *
 */

import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {HOME_SERVICE_BUSINESS_TEXT as TEXT} from "./constants/ServiceListingText";
import TextArea from "../../../common/forms/TextArea";
import LargeTextArea from "../../../common/forms/LargeTextArea";
import SubmitButton from "../../../common/forms/SubmitButton";
import {SHORT_DESC_CHAR_COUNT} from "../../../common/constants/listingsConstants";
import {
    checkIfErrorsExistInMapping,
    validateInput,
} from "../../../registration/registrationUtils";
import {validatePositiveNumber} from "../../../common/utils/generalUtils";
import Tooltip from "../../../common/forms/Tooltip";
import {CREATE_LISTING_MEMBER_SHARE_HOME as ToolTipText} from "../../../common/constants/TooltipText";
import {BUSINESS_SERVICE_CATEGORIES} from "../../constants/serviceListingCategoriesText";
import MultiImageUpload from "../../../common/forms/MultiImageUpload";
import {DEFAULT_MAX_NUM_IMAGES} from "../../constants/createListingConfig";
import {LISTING_FIELD_LENGTHS} from "../../../common/constants/fieldLengths";

const HomeServiceBusinessForm = (props) => {
    const {
        onSubmit,
        category,
        listingExists = false,
        existingTitle,
        existingShortDescription,
        existingFullDescription,
        existingRateAndFees
    } = props;

    const [title, setTitle] = useState(existingTitle || undefined);
    const [shortDescription, setShortDescription] = useState(existingShortDescription || undefined);
    const [rateAndFees, setRateAndFees] = useState(existingRateAndFees || undefined);
    const [fullDescription, setFullDescription] = useState(existingFullDescription || undefined);
    const [pictures, setPictures] = useState([]);

    const [titleError, setTitleError] = useState(undefined);
    const [shortDescriptionError, setShortDescriptionError] = useState(undefined);
    const [fullDescriptionError, setFullDescriptionError] = useState(undefined);
    const [rateAndFeesError, setRateAndFeesError] = useState(undefined);

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
        rateAndFees !== undefined && validatePositiveNumber(rateAndFees, setRateAndFeesError);
    }, [rateAndFees]);

    function handleImageUpload(e) {
        setPictures([...e.target.files]);
    }

    const isFormValid = () => {

        const errors = {
            title: false,
            shortDes: false,
            fullDes: false,
            rateAndFees: false,
        }

        errors.title = validateInput(title, setTitleError);
        errors.shortDes = validateInput(shortDescription, setShortDescriptionError);
        errors.fullDes = validateInput(fullDescription, setFullDescriptionError);
        errors.ratesAndFees = validatePositiveNumber(rateAndFees, setRateAndFeesError);

        return !(checkIfErrorsExistInMapping(errors));
    }

    //function for input checks on submit
    function onCreateListing() {
        if (isFormValid()) {
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
                        <h1 className={"page-title mb-5"}>
                            {(category === BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES
                                ? TEXT.home_form_title
                                : TEXT.business_form_title)}
                        </h1>
                        <TextArea
                            className={`${titleError && "border-red-500"} input`}
                            label={TEXT.title}
                            labelClassName={"label"}
                            required={true}
                            onChange={(e) => setTitle(e.target.value)}
                            value={title || ''}
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
                                />
                            </section>
                            <section className={"col-start-6 col-end-10"}>
                                <TextArea
                                    className={`${rateAndFeesError && "border-red-500"} input`}
                                    label={TEXT.rates_and_fees}
                                    labelClassName={"label"}
                                    required={true}
                                    onChange={(e) => setRateAndFees(e.target.value)}
                                    value={rateAndFees || ''}
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
                            charLimit={LISTING_FIELD_LENGTHS.FULL_DESCRIPTION}
                        />

                        {!listingExists &&
                        <div>
                            <label className="label"> Photos </label>
                            <p>{ToolTipText.PHOTOS}</p>
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
HomeServiceBusinessForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired,
    listingExists: PropTypes.bool,
    existingTitle: PropTypes.string,
    existingShortDescription: PropTypes.string,
    existingFullDescription: PropTypes.string,
    existingRateAndFees: PropTypes.string,
}

export default HomeServiceBusinessForm;
