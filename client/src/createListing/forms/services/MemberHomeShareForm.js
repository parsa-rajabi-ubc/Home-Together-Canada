/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.3
 *
 * @Description: Form to create a listing in Member Home Share category
 *
 */

import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {MEMBER_HOME_SHARE_TEXT as TEXT} from "./constants/ServiceListingText";
import {
    checkIfErrorsExistInMapping,
    validateInput, validatePostalCode,
} from "../../../registration/registrationUtils";
import TextArea from "../../../common/forms/TextArea";
import LargeTextArea from "../../../common/forms/LargeTextArea";
import Dropdown from "../../../common/forms/Dropdown";
import {options} from "./constants/BedroomBathroomDropdownOptions";
import LabelAsterisk from "../../../common/forms/LabelAsterisk";
import {dropdownDefaultCSS, dropdownErrorCSS} from "../../../css/dropdownCSSUtil";
import YNButton from "../../../common/forms/YNButtons";
import SubmitButton from "../../../common/forms/SubmitButton";
import Tooltip from "../../../common/forms/Tooltip";
import {CREATE_LISTING_MEMBER_SHARE_HOME as ToolTipText} from "../../../common/constants/TooltipText";
import {resolveBooleanToYesNo, validatePositiveNumber} from "../../../common/utils/generalUtils";
import {SHORT_DESC_CHAR_COUNT} from "../../../common/constants/listingsConstants";
import Address from "../../../common/forms/Address";
import MultiImageUpload from "../../../common/forms/MultiImageUpload";
import {DEFAULT_MAX_NUM_IMAGES} from "../../constants/createListingConfig";
import {LISTING_FIELD_LENGTHS} from "../../../common/constants/fieldLengths";


const MemberHomeShareForm = (props) => {
    const {
        onSubmit,
        listingExists = false,
        existingTitle,
        existingShortDescription,
        existingFullDescription,
        existingMonthlyCost,
        existingUtilsIncluded,
        existingNumBed,
        existingNumBath,
        existingPetFriendly,
        existingSmokeFriendly,
        existingAddressLine1,
        existingAddressLine2,
        existingCity,
        existingProvince,
        existingPostalCode,
        existingPictures
    } = props;

    const [title, setTitle] = useState(existingTitle || undefined);
    const [shortDescription, setShortDescription] = useState(existingShortDescription || undefined);
    const [fullDescription, setFullDescription] = useState(existingFullDescription || undefined);
    const [monthlyCost, setMonthlyCost] = useState(existingMonthlyCost || undefined);
    const [utilIncluded, setUtilIncluded] = useState(
        listingExists
            ? resolveBooleanToYesNo(existingUtilsIncluded)
            : undefined
    );
    const [numBed, setNumBed] = useState(existingNumBed || undefined);
    const [numBath, setNumBath] = useState(existingNumBath || undefined);
    const [petFriendly, setPetFriendly] = useState(
        listingExists
            ? resolveBooleanToYesNo(existingPetFriendly)
            : undefined
    );
    const [smokeFriendly, setSmokeFriendly] = useState(
        listingExists
            ? resolveBooleanToYesNo(existingSmokeFriendly)
            : undefined
    );
    const [pictures, setPictures] = useState(existingPictures || undefined);

    const [address, setAddress] = useState({
        street: existingAddressLine1 || undefined,
        aptNum: existingAddressLine2 || undefined,
        city: existingCity || undefined,
        province: existingProvince || undefined,
        postalCode: existingPostalCode || undefined
    });

    const [titleError, setTitleError] = useState(undefined);
    const [shortDescriptionError, setShortDescriptionError] = useState(undefined);
    const [fullDescriptionError, setFullDescriptionError] = useState(undefined);
    const [monthlyCostError, setMonthlyCostError] = useState(undefined);
    const [utilIncludedError, setUtilIncludedError] = useState(undefined);
    const [numBedError, setNumBedError] = useState(undefined);
    const [numBathError, setNumBathError] = useState(undefined);
    const [petFriendlyError, setPetFriendlyError] = useState(undefined);
    const [smokeFriendlyError, setSmokeFriendlyError] = useState(undefined);

    // Address Error
    const [streetAddressError, setStreetAddressError] = useState(undefined);
    const [cityAddressError, setCityAddressError] = useState(undefined);
    const [provinceAddressError, setProvinceAddressError] = useState(undefined);
    const [postalCodeError, setPostalCodeError] = useState(undefined);


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
        monthlyCost !== undefined && validatePositiveNumber(monthlyCost, setMonthlyCostError);
    }, [monthlyCost]);
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
        utilIncluded !== undefined && validateInput(utilIncluded, setUtilIncludedError);
    }, [utilIncluded]);

// Address
    useEffect(() => {
        address.street !== undefined && validateInput(address.street, setStreetAddressError);
    }, [address.street]);
    useEffect(() => {
        address.city !== undefined && validateInput(address.city, setCityAddressError);
    }, [address.city]);
    useEffect(() => {
        address.province !== undefined && validateInput(address.province, setCityAddressError);
    }, [address.province]);
    useEffect(() => {
        address.postalCode !== undefined && validatePostalCode(address.postalCode, setPostalCodeError);
    }, [address.postalCode]);

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
            monthlyCost: false,
            utilIncluded: false,
            numBed: false,
            numBath: false,
            pet: false,
            smoking: false,

            streetAddress: false,
            cityAddress: false,
            provinceAddress: false,
            postalCodeAddress: false,
        }

        errors.title = validateInput(title, setTitleError);
        errors.shortDes = validateInput(shortDescription, setShortDescriptionError);
        errors.fullDes = validateInput(fullDescription, setFullDescriptionError);
        errors.monthlyCost = validatePositiveNumber(monthlyCost, setMonthlyCostError);
        errors.utilIncluded = validateInput(utilIncluded, setUtilIncludedError);
        errors.numBed = validateInput(numBed, setNumBedError);
        errors.numBath = validateInput(numBath, setNumBathError);
        errors.pet = validateInput(petFriendly, setPetFriendlyError);
        errors.smoking = validateInput(smokeFriendly, setSmokeFriendlyError);

        errors.streetAddress = validateInput(address.street, setStreetAddressError);
        errors.cityAddress = validateInput(address.city, setCityAddressError);
        errors.provinceAddress = validateInput(address.province, setProvinceAddressError);
        errors.postalCodeAddress = validatePostalCode(address.postalCode, setPostalCodeError);

        return !(checkIfErrorsExistInMapping(errors));
    }

    //function for input checks on submit
    function onCreateListing() {

        if (isFormValid()) {
            onSubmit({
                title,
                shortDescription,
                fullDescription,
                numBath,
                numBed,
                smokeFriendly,
                petFriendly,
                utilIncluded,
                monthlyCost,
                addressLine1: address.street,
                addressLine2: address.aptNum,
                city: address.city,
                province: address.province,
                postalCode: address.postalCode,
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
                            charLimit={LISTING_FIELD_LENGTHS.TITLE}
                            value={title || ''}
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
                                    value={shortDescription || ''}
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
                                <LabelAsterisk label={TEXT.monthly_cost} className={"label"}/>
                                <input
                                    className={`${monthlyCostError && "border-red-500"} input`}
                                    type="number"
                                    min="0"
                                    step="1"
                                    onChange={(e) => setMonthlyCost(e.target.value)}
                                    value={monthlyCost}
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
                                    initialSelection={(numBed && {label: numBed, value: numBed}) || undefined}
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

                            <section className={"col-start-1 col-end-5"}>

                                <LabelAsterisk
                                    label={TEXT.num_bath}
                                    className={"label"}
                                />
                                <Dropdown
                                    options={options}
                                    onChange={handleNumBathChange}
                                    dropdownCSS={numBathError ? dropdownErrorCSS : dropdownDefaultCSS}
                                    initialSelection={(numBath && {label: numBath, value: numBath}) || undefined}
                                />
                            </section>

                            <section className={"col-start-1 col-end-6"}>
                                <Address
                                    label="General Location"
                                    toolTipID={"memberHomeToShareAddress"}
                                    toolTipText={ToolTipText.ADDRESS}
                                    required={true}
                                    value={address}
                                    onChange={setAddress}
                                    streetAddressError={streetAddressError}
                                    cityAddressError={cityAddressError}
                                    provinceAddressError={provinceAddressError}
                                    postalCodeError={postalCodeError}
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
                            value={fullDescription}
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

MemberHomeShareForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    listingExists: PropTypes.bool,
    existingTitle: PropTypes.string,
    existingShortDescription: PropTypes.string,
    existingFullDescription: PropTypes.string,
    existingMonthlyCost: PropTypes.number,
    existingUtilsIncluded: PropTypes.bool,
    existingNumBed: PropTypes.number,
    existingNumBath: PropTypes.number,
    existingPetFriendly: PropTypes.bool,
    existingSmokeFriendly: PropTypes.bool,
    existingAddressLine1: PropTypes.string,
    existingAddressLine2: PropTypes.string,
    existingCity: PropTypes.string,
    existingProvince: PropTypes.string,
    existingPostalCode: PropTypes.string,
    existingPictures: PropTypes.arrayOf(PropTypes.string)
}

export default MemberHomeShareForm;
