/**
 * @Author:     Jeff Hatton
 * @Created:    2021.02.10
 *
 * @Description: Cohousing listing form
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
import UploadImage from "../../../common/forms/UploadImage";
import {BUSINESS_SERVICE_CATEGORIES} from "../../constants/serviceListingCategoriesText";

const HomeServiceBusinessForm = (props) => {
    const { onSubmit, category } = props;

    const [title, setTitle] = useState(undefined);
    const [shortDescription, setShortDescription] = useState(undefined);
    const [rateAndFees, setRateAndFees] = useState(undefined);
    const [fullDescription, setFullDescription] = useState(undefined);
    const [pictures, setPictures] = useState(undefined);

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
        setPictures(e.target.files[0]);
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
            });
        }
    }

    return (
        <div>
            <div className="col-start-1 col-end-7 py-5 px-5 m-6 bg-white shadow-lg rounded-xl">
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-3 sm:col-span-2">

                        <h1 className={"page-title mb-5"}> {(category === BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES ? TEXT.home_form_title : TEXT.business_form_title)} </h1>

                        <TextArea
                            className={`${titleError && "border-red-500"} input`}
                            label={TEXT.title}
                            labelClassName={"label"}
                            required={true}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <div className={"grid grid-cols-9"}>

                            <section className={"col-start-1 col-end-5"}>

                                <TextArea
                                    className={`${shortDescriptionError && "border-red-500"} input`}
                                    label={TEXT.short_des + " (" + SHORT_DESC_CHAR_COUNT + " Characters)"}
                                    labelClassName={"label"}
                                    required={true}
                                    onChange={(e) => setShortDescription(e.target.value)}
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
                        />
                        <label className="label"> Photos </label>
                        <Tooltip
                            text={ToolTipText.PHOTOS}
                            toolTipID={"UploadPhotos"}
                        />
                        <UploadImage handleImageUpload={handleImageUpload}/>
                    </div>
                </div>
            </div>
            <SubmitButton className={"btn btn-green form-btn w-1/2"} onClick={onCreateListing}
                          onSubmit={onCreateListing}/>
        </div>
    )

}
HomeServiceBusinessForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    category: PropTypes.string.isRequired
}

export default HomeServiceBusinessForm;