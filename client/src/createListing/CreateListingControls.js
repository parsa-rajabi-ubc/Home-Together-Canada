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
    GOVERNMENT_SERVICES_SUBCATEGORIES_LIST,
    CO_HOUSING_SUBCATEGORIES_LIST,
    MEMBER_SERVICE_CATEGORIES_DROPDOWN,
    MEMBER_SERVICE_CATEGORIES_DROPDOWN_OBJECT,
    SHARED_COMMUNITY_SUBCATEGORIES_LIST,
    SHARED_SERVICES_SUBCATEGORIES_LIST
} from "./constants/serviceListingConstants";
import {BUSINESS_SERVICE_CATEGORIES, MEMBER_SERVICE_CATEGORIES} from "./constants/serviceListingText"
import {BUSINESS_CLASSIFIEDS_CATEGORIES} from "./constants/classifiedListingText"

import {dropdownDefaultCSS} from "../css/dropdownCSSUtil";
import {
    BUSINESS_CLASSIFIEDS_CATEGORIES_DROPDOWN,
    CLASSES_CLUBS_EVENTS_SUBCATEGORIES_LIST,
    HOUSE_YARD_SERVICES_SUBCATEGORIES_LIST,
    LEGAL_SALES_AGENCIES_SUBCATEGORIES_LIST,
    RENTALS_SUBCATEGORIES_LIST
} from "./constants/classifiedListingConstants";
import Checkbox from "../common/forms/Checkbox";
import {SERVICES_TEXT, CLASSIFIEDS_TEXT, CREATE_LISTINGS_TEXT} from "../common/constants/listingsConstants";
import {isValueInArray} from "../common/utils/generalUtils";
import PropTypes from "prop-types";

const CREATE_LISTING_CONTROLS_TEXT = {
    CREATE_LISTING: CREATE_LISTINGS_TEXT,
    SELECT_LISTING_TYPE: "Select Type of Listing",
    SELECT_LISTING_CATEGORY: "Select Listing Category",
    SELECT_SUBCATEGORIES: "Select All Relevant Subcategories"
}

const CreateListingControls = (props) => {
    const {isUserMember, categoryToDisplay} = props;

    const [selectedListingType, setSelectedListingType] = useState(isUserMember && SERVICES_TEXT);
    const [selectedCategory, setSelectedCategory] = useState(isUserMember && MEMBER_SERVICE_CATEGORIES.MEMBER_HOME);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState(isUserMember && MEMBER_SERVICE_CATEGORIES_DROPDOWN);
    const [subcategories, setSubcategories] = useState([]);

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
        categoryToDisplay(selectedCategory);

        returnSubcategory(selectedCategory);
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
    }

    const returnSubcategory = (selectedCategory) => {
        if (selectedListingType === SERVICES_TEXT) {
            switch (selectedCategory) {
                case BUSINESS_SERVICE_CATEGORIES.SHARE_COMMUNITY:
                    setSubcategories(CO_HOUSING_SUBCATEGORIES_LIST);
                    break;
                case BUSINESS_SERVICE_CATEGORIES.SHARED_SERVICES:
                    setSubcategories(SHARED_SERVICES_SUBCATEGORIES_LIST);
                    break;
                case BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES:
                    setSubcategories(GOVERNMENT_SERVICES_SUBCATEGORIES_LIST);

            }
        } else {
            switch (selectedCategory) {
                case BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS:
                    setSubcategories(RENTALS_SUBCATEGORIES_LIST);
                    break;
                case BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD:
                    setSubcategories(HOUSE_YARD_SERVICES_SUBCATEGORIES_LIST);
                    break;
                case BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES:
                    setSubcategories(LEGAL_SALES_AGENCIES_SUBCATEGORIES_LIST);
                    break;
                case BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS:
                    setSubcategories(CLASSES_CLUBS_EVENTS_SUBCATEGORIES_LIST);
            }
        }
    }

    const subcategoryCheckboxes = [];

    for (let i = 0; i < subcategories.length; i++) {
        subcategoryCheckboxes.push(
            <Checkbox
                key={subcategories[i]}
                label={subcategories[i]}
                id={subcategories[i]}
                fontNormal={true}
                onChange={handleSubcategoriesChange}
            />
        );
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
            <section className={"m-4"}>
                <label className={"label text-lg"}>{CREATE_LISTING_CONTROLS_TEXT.SELECT_LISTING_CATEGORY}</label>
                {/* Unique key is used to reset the selected value */}
                <Dropdown
                    key={categoryOptions}
                    options={categoryOptions}
                    initialSelection={isUserMember ? MEMBER_SERVICE_CATEGORIES_DROPDOWN_OBJECT : null}
                    isDisabled={isUserMember}
                    onChange={handleCategoryChange}
                    dropdownCSS={dropdownDefaultCSS}
                />
            </section>
            }

            {(selectedCategory && !isUserMember) &&
            <section className={"m-4"}>
                <p className={"label text-lg mb-1"}>{CREATE_LISTING_CONTROLS_TEXT.SELECT_SUBCATEGORIES}</p>
                {subcategoryCheckboxes}
            </section>
            }

        </div>
    );
}

CreateListingControls.propTypes = {
    isUserMember: PropTypes.bool.isRequired,
    categoryToDisplay: PropTypes.func.isRequired
}

export default CreateListingControls;