/**
 * @Author:     Alex Qin
 * @Created:    2021.02.12
 *
 * @Description: Form to create a listing in Rentals category
 *
 */

import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import TextArea from "../../../common/forms/TextArea";
import LabelAsterisk from "../../../common/forms/LabelAsterisk";
import LargeTextArea from "../../../common/forms/LargeTextArea";
import SubmitButton from "../../../common/forms/SubmitButton";
import {SHORT_DESC_CHAR_COUNT} from "../../../common/constants/listingsConstants";
import {
    checkIfErrorsExistInMapping,
    validateInput
} from "../../../registration/registrationUtils";
import {validatePositiveNumber} from "../../../common/utils/generalUtils";
import {RENTALS_TEXT as TEXT} from "./constants/ClassifiedsListingText";
import Tooltip from "../../../common/forms/Tooltip";
import {CREATE_LISTING_MEMBER_SHARE_HOME as ToolTipText} from "../../../common/constants/TooltipText";
import YNButton from "../../../common/forms/YNButtons";
import Dropdown from "../../../common/forms/Dropdown";
import {options} from "../services/constants/BedroomBathroomDropdownOptions";
import {dropdownDefaultCSS, dropdownErrorCSS} from "../../../css/dropdownCSSUtil";
import MultiImageUpload from "../../../common/forms/MultiImageUpload";
import {DEFAULT_MAX_NUM_IMAGES} from "../../constants/createListingConfig";
import {LISTING_FIELD_LENGTHS} from "../../../common/constants/fieldLengths";

const HouseServicesForm = (props) => {
    const {onSubmit} = props;

    const [title, setTitle] = useState(undefined);
    const [shortDescription, setShortDescription] = useState(undefined);
    const [fullDescription, setFullDescription] = useState(undefined);
    const [price, setPrice] = useState(undefined);
    const [furnished, setFurnished] = useState(undefined);
    const [numBed, setNumBed] = useState(undefined);
    const [numBath, setNumBath] = useState(undefined);
    const [petFriendly, setPetFriendly] = useState(undefined);
    const [smokeFriendly, setSmokeFriendly] = useState(undefined);
    const [pictures, setPictures] = useState(undefined);

    const [submitted, setSubmitted] = useState(false);

    const [titleError, setTitleError] = useState(undefined);
    const [shortDescriptionError, setShortDescriptionError] = useState(undefined);
    const [fullDescriptionError, setFullDescriptionError] = useState(undefined);
    const [priceError, setPriceError] = useState(undefined);
    const [furnishedError, setFurnishedError] = useState(undefined);
    const [numBedError, setNumBedError] = useState(undefined);
    const [numBathError, setNumBathError] = useState(undefined);
    const [petFriendlyError, setPetFriendlyError] = useState(undefined);
    const [smokeFriendlyError, setSmokeFriendlyError] = useState(undefined);


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
        price !== undefined && validatePositiveNumber(price, setPriceError);
    }, [price]);
    useEffect(() => {
        numBed !== undefined && validateInput(numBed, setNumBedError);
    }, [numBed]);
    useEffect(() => {
        numBath !== undefined && validateInput(numBath, setNumBathError);
    }, [numBath]);
    useEffect(() => {
        petFriendly !== undefined && validateInput(petFriendly, setPetFriendlyError);
    }, [petFriendly]);
    useEffect(() => {
        smokeFriendly !== undefined && validateInput(smokeFriendly, setSmokeFriendlyError);
    }, [smokeFriendly]);
    useEffect(() => {
        furnished !== undefined && validateInput(furnished, setFurnishedError);
    }, [furnished]);

    const handleNumBedChange = e => {
        setNumBed(e.value);
    }

    const handleNumBathChange = e => {
        setNumBath(e.value);
    }

    function handleImageUpload(e) {
        setPictures([...e.target.files]);
    }

    const isFormValid = () => {

        const errors = {
            title: false,
            shortDes: false,
            fullDes: false,
            price: false,
            furnished: false,
            numBed: false,
            numBath: false,
            pet: false,
            smoking: false,
        }

        errors.title = validateInput(title, setTitleError);
        errors.shortDes = validateInput(shortDescription, setShortDescriptionError);
        errors.fullDes = validateInput(fullDescription, setFullDescriptionError);
        errors.price = validatePositiveNumber(price, setPriceError);
        errors.furnished = validateInput(furnished, setFurnishedError);
        errors.numBed = validateInput(numBed, setNumBedError);
        errors.numBath = validateInput(numBath, setNumBathError);
        errors.pet = validateInput(petFriendly, setPetFriendlyError);
        errors.smoking = validateInput(smokeFriendly, setSmokeFriendlyError);

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
                price,
                furnished,
                numBed,
                numBath,
                petFriendly,
                smokeFriendly,
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
                            disabled={submitted}
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
                                    charLimit={SHORT_DESC_CHAR_COUNT}
                                    disabled={submitted}
                                />
                            </section>
                            <section className={"col-start-1 col-end-5"}>
                                <LabelAsterisk label={TEXT.price} className={"label"}/>
                                <input
                                    className={`${priceError && "border-red-500"} ${submitted && "disabled-field"} input`}
                                    type="number"
                                    min="0"
                                    step="1"
                                    onChange={(e) => setPrice(e.target.value)}
                                    disabled={submitted}
                                />
                            </section>
                            <section
                                className={`${furnishedError && "pl-1 border rounded-lg border-red-500"} my-2 col-start-6 col-end-9`}>
                                <YNButton
                                    label={TEXT.furnished}
                                    name="furnished"
                                    required={true}
                                    value={furnished}
                                    onChange={(e) => setFurnished(e.target.value)}
                                    disabled={submitted}
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
                                    dropdownCSS={numBedError ? dropdownErrorCSS : dropdownDefaultCSS}
                                    isDisabled={submitted}
                                />
                            </section>
                            <section
                                className={`${petFriendlyError && "pl-1 border rounded-lg border-red-500"} my-2 col-start-6 col-end-9`}>
                                <YNButton
                                    label={TEXT.pet}
                                    name="petFriendly"
                                    required={true}
                                    value={petFriendly}
                                    onChange={(e) => setPetFriendly(e.target.value)}
                                    disabled={submitted}
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
                                    isDisabled={submitted}
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
                                    disabled={submitted}
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
                            disabled={submitted}
                            charLimit={LISTING_FIELD_LENGTHS.FULL_DESCRIPTION}
                        />
                        <label className="label"> {TEXT.pictures} </label>
                        <Tooltip
                            text={ToolTipText.PHOTOS}
                            toolTipID={"UploadPhotos"}
                        />
                        <MultiImageUpload handleImageUpload={handleImageUpload} maxNumImages={DEFAULT_MAX_NUM_IMAGES}/>
                    </div>
                </div>
            </div>
            <SubmitButton
                className={"btn btn-green form-btn w-1/2"}
                onClick={onCreateListing}
            />
        </div>
    )

}
HouseServicesForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default HouseServicesForm;