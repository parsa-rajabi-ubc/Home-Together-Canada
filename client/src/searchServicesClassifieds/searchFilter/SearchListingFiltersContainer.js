/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Search Listing Filter Container
 *
 */

import React, {useContext, useEffect, useState} from 'react';
import {listingContext, PAGE_NAMES} from "../SearchListingContainer";
import SearchListingFilters from "./SearchListingFilters";
import {
    BUSINESS_SERVICE_CATEGORIES_DROPDOWN,
    CO_HOUSING_SUBCATEGORIES_LIST,
    GOVERNMENT_SERVICES_SUBCATEGORIES_LIST,
    SHARED_BUSINESS_SERVICES_SUBCATEGORIES_LIST,
    SHARED_HOME_SERVICES_SUBCATEGORIES_LIST
} from "../../createListing/constants/serviceListingConstants";
import {
    BUSINESS_CLASSIFIEDS_CATEGORIES_DROPDOWN,
    CLASSES_CLUBS_EVENTS_SUBCATEGORIES_LIST,
    HOUSE_YARD_SERVICES_SUBCATEGORIES_LIST,
    LEGAL_SALES_AGENCIES_SUBCATEGORIES_LIST,
    RENTALS_SUBCATEGORIES_LIST
} from "../../createListing/constants/classifiedListingConstants";
import {BUSINESS_SERVICE_CATEGORIES} from "../../createListing/constants/serviceListingCategoriesText";
import {BUSINESS_CLASSIFIEDS_CATEGORIES} from "../../createListing/constants/classifiedListingCategoriesText";
import {isValueInArray} from "../../common/utils/generalUtils";
import {checkIfErrorsExistInMapping, validateInput, validateMinMaxFilter} from "../../registration/registrationUtils";


function SearchListingFiltersContainer() {

    const listingPage = useContext(listingContext);

    const [selectedCategory, setSelectedCategory] = useState();
    const [categoryOptions, setCategoryOptions] = useState(
        (listingPage === PAGE_NAMES.SERVICES
            ? BUSINESS_SERVICE_CATEGORIES_DROPDOWN
            : BUSINESS_CLASSIFIEDS_CATEGORIES_DROPDOWN));
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);


    // Error Validation
    const [selectedCategoryError, setSelectedCategoryError] = useState(undefined);
    const [selectedSubcategoryError, setSelectedSubcategoryError] = useState(false);

    // Update Validation after a category has been selected
    useEffect(() => {
        (selectedCategory !== undefined && validateInput(selectedCategory, setSelectedCategoryError));
    }, [selectedCategory, listingPage]);


    // Update Category Options Based on Page
    useEffect(() => {
        (listingPage === PAGE_NAMES.SERVICES
            ? setCategoryOptions(BUSINESS_SERVICE_CATEGORIES_DROPDOWN)
            : setCategoryOptions(BUSINESS_CLASSIFIEDS_CATEGORIES_DROPDOWN));

        // reset to default values
        setSelectedCategory();
        setSubcategories([]);

    }, [listingPage]);

    // Update subcategories based on Category selected
    useEffect(() => {
        returnSubcategory(selectedCategory);
        setSelectedSubcategories([]);
    }, [selectedCategory]);


    const handleCategoryChange = (e) => {
        setSelectedCategory(e.value);
    };

    // set the subcategory based on the given category
    function returnSubcategory(selectedCategory) {
        switch (selectedCategory) {
            case BUSINESS_SERVICE_CATEGORIES.CO_HOUSING:
                setSubcategories(CO_HOUSING_SUBCATEGORIES_LIST);
                break;
            case BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES:
                setSubcategories(SHARED_HOME_SERVICES_SUBCATEGORIES_LIST);
                break;
            case BUSINESS_SERVICE_CATEGORIES.SHARED_BUSINESS_SERVICES:
                setSubcategories(SHARED_BUSINESS_SERVICES_SUBCATEGORIES_LIST);
                break;
            case BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES:
                setSubcategories(GOVERNMENT_SERVICES_SUBCATEGORIES_LIST);
                break;
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
                break;
        }
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

    const isFormValid = () => {

        const searchErrors = {
            selectedCategory: false,
            selectedSubcategory: false,
        }

        // Search Criteria Validation
        searchErrors.selectedCategory = validateInput(selectedCategory, setSelectedCategoryError);
        searchErrors.selectedSubcategory = validateInput(selectedSubcategories, setSelectedSubcategoryError);

        // check search criteria for errors
        return !checkIfErrorsExistInMapping(searchErrors);
    }

    const onSubmit = () => {
        isFormValid();

    }

    return (
        <div>
            <div className={"w-1/3"}>
                <SearchListingFilters
                    categoryOptions={categoryOptions}
                    selectedCategory={selectedCategory}
                    subcategories={subcategories}
                    handleSubcategoriesChange={handleSubcategoriesChange}
                    handleCategoryChange={handleCategoryChange}
                    selectedCategoryError={selectedCategoryError}
                    selectedSubcategoryError={selectedSubcategoryError}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    );
}


export default SearchListingFiltersContainer;