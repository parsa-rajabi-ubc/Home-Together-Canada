/**
 * @Author:     Parsa Rajabi & Rachelle Gelden
 * @Created:    2021.02.05
 *
 * @Description: Create Listing Controls;
 *
 */

import React, {useEffect, useState} from 'react';
import RadioButton from "../common/forms/RadioButton";
import Dropdown from "../common/forms/Dropdown";
import {
    BUSINESS_SERVICE_CATEGORIES_DROPDOWN,
    MEMBER_SERVICE_CATEGORIES_DROPDOWN,
    MEMBER_SERVICE_CATEGORIES_DROPDOWN_OBJECT,
} from "./constants/serviceListingConstants";
import {MEMBER_SERVICE_CATEGORIES} from "./constants/serviceListingCategoriesText"

import {dropdownDefaultCSS} from "../css/dropdownCSSUtil";
import {
    BUSINESS_CLASSIFIEDS_CATEGORIES_DROPDOWN
} from "./constants/classifiedListingConstants";
import {SERVICES_TEXT, CLASSIFIEDS_TEXT, CREATE_LISTINGS_TEXT} from "../common/constants/listingsConstants";
import {isValueInArray} from "../common/utils/generalUtils";
import PropTypes from "prop-types";
import {validateInput} from "../registration/registrationUtils";
import {getSubcategories} from "../common/utils/listingsUtils";
import CheckboxesList from "../common/forms/CheckboxesList";

export const CREATE_LISTING_CONTROLS_TEXT = {
    CREATE_LISTING: CREATE_LISTINGS_TEXT,
    SELECT_LISTING_TYPE: "Select Type of Listing",
    SELECT_LISTING_CATEGORY: "Select Listing Category",
    SELECT_SUBCATEGORIES: "Select All Relevant Subcategories"
}

const CreateListingControls = (props) => {
    const {isUserMember, chosenCategory, chosenSubcategories, isSubcategoryEmpty, submitted} = props;

    const [selectedListingType, setSelectedListingType] = useState(isUserMember && SERVICES_TEXT);
    const [selectedCategory, setSelectedCategory] = useState(isUserMember && MEMBER_SERVICE_CATEGORIES.MEMBER_HOME);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState(isUserMember && MEMBER_SERVICE_CATEGORIES_DROPDOWN);
    const [subcategories, setSubcategories] = useState([]);

    const [selectedSubcategoriesError, setSelectedSubcategoriesError] = useState(undefined);

    useEffect(() => {
        ((selectedSubcategories !== undefined && submitted) &&  validateInput(selectedSubcategories, setSelectedSubcategoriesError));
    }, [selectedSubcategories, submitted]);


    useEffect(() => {
        if (!isUserMember) {
            (selectedListingType === SERVICES_TEXT
                ? setCategoryOptions(BUSINESS_SERVICE_CATEGORIES_DROPDOWN)
                : setCategoryOptions(BUSINESS_CLASSIFIEDS_CATEGORIES_DROPDOWN));
        } else
            setCategoryOptions(MEMBER_SERVICE_CATEGORIES_DROPDOWN);

        // reset to default values
        setSelectedCategory(isUserMember && MEMBER_SERVICE_CATEGORIES.MEMBER_HOME);
        setSubcategories([]);

    }, [selectedListingType]);

    useEffect(() => {
        chosenCategory(selectedCategory);

        setSubcategories(getSubcategories(selectedCategory));
        setSelectedSubcategories([]);
    }, [selectedCategory]);


    const handleCategoryChange = e => {
        setSelectedCategory(e.value);
    }

    function handleSubcategoriesChange(e) {
        const list = [...selectedSubcategories];
        const value = e.target.id;
        // check if the value select already exists in the list
        if (!isValueInArray(list, value)) {
            // if not, add the value
            list.push(value);
        } else {
            // if it does, remove it from the array
            list.splice(list.indexOf(value), 1);
        }
        setSelectedSubcategories(list);
        chosenSubcategories(list);
        isSubcategoryEmpty(!list.length);
    }

    return (
        <div>
            <div className={"page-title mx-4 my-5"}>{CREATE_LISTING_CONTROLS_TEXT.CREATE_LISTING}</div>

            <section className={"m-4"}>
                <label className={"label text-lg"}>{CREATE_LISTING_CONTROLS_TEXT.SELECT_LISTING_TYPE}</label>

                <RadioButton
                    label={SERVICES_TEXT}
                    name={"listingType"}
                    value={SERVICES_TEXT}
                    checked={selectedListingType === SERVICES_TEXT}
                    disabled={isUserMember}
                    blockElement={true}
                    onChange={(e) => setSelectedListingType(e.target.value)}
                />

                <RadioButton
                    label={CLASSIFIEDS_TEXT}
                    name={"listingType"}
                    value={CLASSIFIEDS_TEXT}
                    disabled={isUserMember}
                    blockElement={true}
                    onChange={(e) => setSelectedListingType(e.target.value)}
                />
            </section>

            {selectedListingType &&
            <section className={"m-4"} key={selectedListingType}>
                <label className={"label text-lg"}>{CREATE_LISTING_CONTROLS_TEXT.SELECT_LISTING_CATEGORY}</label>
                {/* Unique key is used to reset the selected value */}
                <Dropdown
                    options={categoryOptions}
                    initialSelection={isUserMember ? MEMBER_SERVICE_CATEGORIES_DROPDOWN_OBJECT : null}
                    isDisabled={isUserMember}
                    onChange={handleCategoryChange}
                    dropdownCSS={dropdownDefaultCSS}
                />
            </section>
            }

            {(selectedCategory && subcategories && !isUserMember) &&
            <section className={`${selectedSubcategoriesError && "pl-1 pb-2 border rounded-lg border-red-500"} m-4`}>
                <p className={"label text-lg mb-1"}>{CREATE_LISTING_CONTROLS_TEXT.SELECT_SUBCATEGORIES}</p>
                <CheckboxesList
                    values={subcategories}
                    selectedValues={selectedSubcategories}
                    onChange={handleSubcategoriesChange}
                />
            </section>
            }

        </div>
    );
}

CreateListingControls.propTypes = {
    isUserMember: PropTypes.bool.isRequired,
    chosenCategory: PropTypes.func.isRequired,
    chosenSubcategories: PropTypes.func.isRequired,
    isSubcategoryEmpty: PropTypes.func,
    submitted: PropTypes.bool
}

export default CreateListingControls;