/**
 * @Author:     Jeff Hatton
 * @Created:    2021.02.10
 *
 * @Description: Form to create a listing in Cohousing listing category
 *
 */

import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {CO_HOUSING_TEXT as TEXT} from "./constants/ServiceListingText";
import TextArea from "../../../common/forms/TextArea";
import LabelAsterisk from "../../../common/forms/LabelAsterisk";
import LargeTextArea from "../../../common/forms/LargeTextArea";
import SubmitButton from "../../../common/forms/SubmitButton";
import {SHORT_DESC_CHAR_COUNT} from "../../../common/constants/listingsConstants";
import {
    checkIfErrorsExistInMapping,
    validateInput,
} from "../../../registration/registrationUtils";
import {validatePositiveNumber} from "../../../common/utils/generalUtils";
import {LISTING_FIELD_LENGTHS} from "../../../common/constants/fieldLengths";

const CohousingForm = (props) => {
    const {
        onSubmit,
        listingExists = false,
        existingTitle,
        existingShortDescription,
        existingFullDescription,
        existingContactName,
        existingUnitsForSale,
        existingUnitsForRent
    } = props;

    const [title, setTitle] = useState(existingTitle || undefined);
    const [shortDescription, setShortDescription] = useState(existingShortDescription || undefined);
    const [fullDescription, setFullDescription] = useState(existingFullDescription || undefined);
    const [contactName, setContactName] = useState(existingContactName || undefined);
    const [unitsForSale, setUnitsForSale] = useState(existingUnitsForSale || undefined);
    const [unitsForRent, setUnitsForRent] = useState(existingUnitsForRent || undefined);

    const [titleError, setTitleError] = useState(undefined);
    const [contactNameError, setContactNameError] = useState(undefined);
    const [shortDescriptionError, setShortDescriptionError] = useState(undefined);
    const [fullDescriptionError, setFullDescriptionError] = useState(undefined);
    const [unitsForSaleError, setUnitsForSaleError] = useState(undefined);
    const [unitsForRentError, setUnitsForRentError] = useState(undefined);

    useEffect(() => {
        title !== undefined && validateInput(title, setTitleError);
    }, [title]);
    useEffect(() => {
        contactName !== undefined && validateInput(contactName, setContactNameError);
    }, [contactName]);
    useEffect(() => {
        shortDescription !== undefined && validateInput(shortDescription, setShortDescriptionError);
    }, [shortDescription]);
    useEffect(() => {
        fullDescription !== undefined && validateInput(fullDescription, setFullDescriptionError);
    }, [fullDescription]);
    useEffect(() => {
        unitsForSale !== undefined && validatePositiveNumber(unitsForSale, setUnitsForSaleError);
    }, [unitsForSale]);
    useEffect(() => {
        unitsForRent !== undefined && validatePositiveNumber(unitsForRent, setUnitsForRentError);
    }, [unitsForRent]);

    const isFormValid = () => {

        const errors = {
            title: false,
            contactName: false,
            shortDes: false,
            fullDes: false,
            unitsForSale: false,
            unitsForRent: false,
        }

        errors.title = validateInput(title, setTitleError);
        errors.contactName = validateInput(contactName, setContactNameError);
        errors.shortDes = validateInput(shortDescription, setShortDescriptionError);
        errors.fullDes = validateInput(fullDescription, setFullDescriptionError);
        errors.unitsForSale = validatePositiveNumber(unitsForSale, setUnitsForSaleError);
        errors.unitsForRent = validatePositiveNumber(unitsForRent, setUnitsForRentError);

        return !(checkIfErrorsExistInMapping(errors));
    }

    //function for input checks on submit
    function onCreateListing() {
        if (isFormValid()) {
            onSubmit({
                title,
                contactName,
                shortDescription,
                fullDescription,
                unitsForRent,
                unitsForSale
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
                            <section className={"col-start-6 col-end-9"}>
                                <LabelAsterisk
                                    label={TEXT.units_for_sale}
                                    className={"label"}
                                />
                                <input
                                    className={`${unitsForSaleError && "border-red-500"} input`}
                                    type="number"
                                    min="0"
                                    step="1"
                                    onChange={(e) => setUnitsForSale(e.target.value)}
                                    value={unitsForSale}
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
                            <section className={"col-start-6 col-end-9"}>
                                <LabelAsterisk
                                    label={TEXT.units_for_rent}
                                    className={"label"}
                                />
                                <input
                                    className={`${unitsForRentError && "border-red-500"} input`}
                                    type="number"
                                    min="0"
                                    step="1"
                                    onChange={(e) => setUnitsForRent(e.target.value)}
                                    value={unitsForRent}
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
CohousingForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    listingExists: PropTypes.bool,
    existingTitle: PropTypes.string,
    existingShortDescription: PropTypes.string,
    existingFullDescription: PropTypes.string,
    existingContactName: PropTypes.string,
    existingUnitsForSale: PropTypes.number,
    existingUnitsForRent: PropTypes.number,
    existingSelectedSubcategories: PropTypes.arrayOf(PropTypes.string)
}

export default CohousingForm;