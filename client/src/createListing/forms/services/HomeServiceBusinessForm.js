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

const HomeServiceBusinessForm = (props) => {
    const { onSubmit } = props;

    const [title, setTitle] = useState(undefined);
    const [shortDescription, setShortDescription] = useState(undefined);
    const [ratesAndFees, setRatesAndFees] = useState(undefined);
    const [fullDescription, setFullDescription] = useState(undefined);
    const [pictures, setPictures] = useState(undefined);

    const [titleError, setTitleError] = useState(undefined);
    const [shortDescriptionError, setShortDescriptionError] = useState(undefined);
    const [fullDescriptionError, setFullDescriptionError] = useState(undefined);
    const [ratesAndFeesError, setRatesAndFeesError] = useState(undefined);

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
        ratesAndFees !== undefined && validatePositiveNumber(ratesAndFees, setRatesAndFeesError);
    }, [ratesAndFees]);

    function handleImageUpload(e) {
        setPictures(e.target.files[0]);
    }

    const isFormValid = () => {

        const errors = {
            title: false,
            shortDes: false,
            fullDes: false,
            ratesAndFees: false,
        }

        errors.title = validateInput(title, setTitleError);
        errors.shortDes = validateInput(shortDescription, setShortDescriptionError);
        errors.fullDes = validateInput(fullDescription, setFullDescriptionError);
        errors.ratesAndFees = validatePositiveNumber(ratesAndFees, setRatesAndFeesError);

        return !(checkIfErrorsExistInMapping(errors));
    }

    //function for input checks on submit
    function onCreateListing() {

        if (!isFormValid()) {
            console.log("Form is invalid")
            // form is invalid
        }
        // else form is valid and proceed to make request
        else {
            onSubmit();
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
                        />

                        <div className={"grid grid-cols-9 gap-x-6"}>

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

                            <section className={"col-start-1 col-end-5"}>
                                <TextArea
                                    className={`${ratesAndFeesError && "border-red-500"} input`}
                                    label={TEXT.rates_and_fees}
                                    labelClassName={"label"}
                                    required={true}
                                    onChange={(e) => setRatesAndFees(e.target.value)}
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
    onSubmit: PropTypes.func.isRequired
}

export default HomeServiceBusinessForm;