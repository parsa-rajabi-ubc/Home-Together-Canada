/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.3
 *
 * @Description: Member Home Share Form;
 *
 */

import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {MEMBER_HOME_SHARE_TEXT as TEXT} from "./constants/ServiceListingText";
import {
    checkIfErrorsExistInMapping,
    validateCheckbox,
    validateInput, validatePostalCode,
} from "../../../registration/registrationUtils";
import TextArea from "../../../common/forms/TextArea";
import LargeTextArea from "../../../common/forms/LargeTextArea";
import Dropdown from "../../../common/forms/Dropdown";
import {options} from "./constants/BedroomBathroomDropdownOptions";
import LabelAsterisk from "../../../common/forms/LabelAsterisk";
import {dropdownDefaultCSS, dropdownErrorCSS} from "../../../css/dropdownCSSUtil";
import YNButton from "../../../common/forms/YNButtons";
import UploadImage from "../../../common/forms/UploadImage";
import SubmitButton from "../../../common/forms/SubmitButton";
import Tooltip from "../../../common/forms/Tooltip";
import {CREATE_LISTING_MEMBER_SHARE_HOME as ToolTipText} from "../../../common/constants/TooltipText";
import {validatePositiveNumber} from "../../../common/utils/generalUtils";
import {SHORT_DESC_CHAR_COUNT} from "../../../common/constants/listingsConstants";


const MemberHomeShareForm = (props) => {
    const {onSubmit} = props;

    const [title, setTitle] = useState(undefined);
    const [postalCode, setPostalCode] = useState(undefined);
    const [shortDescription, setShortDescription] = useState(undefined);
    const [fullDescription, setFullDescription] = useState(undefined);
    const [monthlyCost, setMonthlyCost] = useState(undefined);
    const [utilIncluded, setUtilIncluded] = useState(undefined);
    const [numBed, setNumBed] = useState(undefined);
    const [numBath, setNumBath] = useState(undefined);
    const [petFriendly, setPetFriendly] = useState(undefined);
    const [smokeFriendly, setSmokeFriendly] = useState(undefined);
    const [photos, setPhotos] = useState(undefined);

    const [titleError, setTitleError] = useState(undefined);
    const [postalCodeError, setPostalCodeError] = useState(undefined);
    const [shortDescriptionError, setShortDescriptionError] = useState(undefined);
    const [fullDescriptionError, setFullDescriptionError] = useState(undefined);
    const [monthlyCostError, setMonthlyCostError] = useState(undefined);
    const [utilIncludedError, setUtilIncludedError] = useState(undefined);
    const [numBedError, setNumBedError] = useState(undefined);
    const [numBathError, setNumBathError] = useState(undefined);
    const [petFriendlyError, setPetFriendlyError] = useState(undefined);
    const [smokeFriendlyError, setSmokeFriendlyError] = useState(undefined);


    useEffect(() => {
        title !== undefined && validateInput(title, setTitleError);
    }, [title]);
    useEffect(() => {
        postalCode !== undefined && validatePostalCode(postalCode, setPostalCodeError);
    }, [postalCode]);
    useEffect(() => {
        shortDescription !== undefined && validateInput(shortDescription, setShortDescriptionError);
    }, [shortDescription]);
    useEffect(() => {
        fullDescription !== undefined && validateInput(fullDescription, setFullDescriptionError);
    }, [fullDescription]);
    useEffect(() => {
        monthlyCost !== undefined && validatePositiveNumber(monthlyCost, setMonthlyCostError);
    }, [monthlyCost]);
    useEffect(() => {
        numBed !== undefined && validateInput(numBed, setNumBedError);
    }, [numBed]);
    useEffect(() => {
        numBath !== undefined && validateInput(numBath, setNumBathError);
    }, [numBath]);
    useEffect(() => {
        petFriendly !== undefined && validateCheckbox(petFriendly, setPetFriendlyError);
    }, [petFriendly]);
    useEffect(() => {
        smokeFriendly !== undefined && validateCheckbox(smokeFriendly, setSmokeFriendlyError);
    }, [smokeFriendly]);
    useEffect(() => {
        utilIncluded !== undefined && validateCheckbox(utilIncluded, setUtilIncludedError);
    }, [utilIncluded]);


    const handleNumBedChange = e => {
        setNumBed(e.value);
    }

    const handleNumBathChange = e => {
        setNumBath(e.value);
    }

    function handleImageUpload(e) {
        setPhotos(e.target.files[0]);
    }

    const isFormValid = () => {

        const errors = {
            title: false,
            postalCode: false,
            shortDes: false,
            fullDes: false,
            monthlyCost: false,
            utilIncluded: false,
            numBed: false,
            numBath: false,
            pet: false,
            smoking: false,
        }

        errors.title = validateInput(title, setTitleError);
        errors.postalCode = validatePostalCode(postalCode, setPostalCodeError);
        errors.shortDes = validateInput(shortDescription, setShortDescriptionError);
        errors.fullDes = validateInput(fullDescription, setFullDescriptionError);
        errors.monthlyCost = validatePositiveNumber(monthlyCost, setMonthlyCostError);
        errors.utilIncluded = validateInput(utilIncluded, setUtilIncludedError);
        errors.numBed = validateInput(numBed, setNumBedError);
        errors.numBath = validateInput(numBath, setNumBathError);
        errors.pet = validateInput(petFriendly, setPetFriendlyError);
        errors.smoking = validateInput(smokeFriendly, setSmokeFriendlyError);

        return !(checkIfErrorsExistInMapping(errors));
    }

    //function for input checks on submit
    function onCreateListing() {

        if (isFormValid()) {
            onSubmit({
                title,
                postalCode,
                shortDescription,
                fullDescription,
                numBath,
                numBed,
                smokeFriendly,
                petFriendly,
                utilIncluded,
                monthlyCost
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
                            <section className={"col-start-6 col-end-9"}>
                                <TextArea
                                    className={`${postalCodeError && "border-red-500"} input`}
                                    label={TEXT.postal_code}
                                    labelClassName={"label"}
                                    required={true}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                />
                            </section>


                            <section className={"col-start-1 col-end-5"}>
                                <LabelAsterisk label={TEXT.monthly_cost} className={"label"}/>
                                <input
                                    className={`${monthlyCostError && "border-red-500"} input`}
                                    type="number"
                                    min="0"
                                    step="1"
                                    onChange={(e) => setMonthlyCost(e.target.value)}
                                />
                            </section>
                            <section
                                className={`${utilIncludedError && "pl-1 border rounded-lg border-red-500"} my-2 col-start-6 col-end-9`}>
                                <YNButton
                                    label={TEXT.util_included}
                                    name="utilIncluded"
                                    required={true}
                                    value={utilIncluded}
                                    onChange={(e) => setUtilIncluded(e.target.value)}
                                />
                            </section>
                            <section className={"col-start-1 col-end-5"}>
                                <LabelAsterisk
                                    label={TEXT.num_bed}
                                    className={"label"}
                                />

                                <Dropdown
                                    options={options}
                                    onChange={handleNumBedChange}
                                    dropdownCSS={numBedError ? dropdownErrorCSS : dropdownDefaultCSS}/>

                            </section>

                            <section
                                className={`${petFriendlyError && "pl-1 border rounded-lg border-red-500"} my-2 col-start-6 col-end-9`}>
                                <YNButton
                                    label={TEXT.pet}
                                    name="petFriendly"
                                    required={true}
                                    value={petFriendly}
                                    onChange={(e) => setPetFriendly(e.target.value)}
                                />
                            </section>
                            <section className={"col-start-1 col-end-5"}>
                                <LabelAsterisk
                                    label={TEXT.num_bath}
                                    className={"label"}
                                />
                                <Dropdown
                                    options={options}
                                    onChange={handleNumBathChange}
                                    dropdownCSS={numBathError ? dropdownErrorCSS : dropdownDefaultCSS}
                                />

                            </section>


                            <section
                                className={`${smokeFriendlyError && "pl-1 border rounded-lg border-red-500"} my-2 col-start-6 col-end-9`}>
                                <YNButton
                                    label={TEXT.smoking}
                                    name="smokeFriendly"
                                    required={true}
                                    value={smokeFriendly}
                                    onChange={(e) => setSmokeFriendly(e.target.value)}
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

MemberHomeShareForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default MemberHomeShareForm;