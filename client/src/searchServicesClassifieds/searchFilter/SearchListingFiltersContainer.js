/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Search Listing Filter Container
 *
 */

import React, {useContext, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {listingContext, PAGE_NAMES} from "../SearchListingContainer";
import SearchListingFilters from "./SearchListingFilters";
import {
    BUSINESS_SERVICE_CATEGORIES_DROPDOWN,
    CO_HOUSING_SUBCATEGORIES_LIST,
    GOVERNMENT_SERVICES_SUBCATEGORIES_LIST,
    MEMBER_SERVICE_CATEGORIES_DROPDOWN,
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
import {
    BUSINESS_SERVICE_CATEGORIES,
    MEMBER_SERVICE_CATEGORIES
} from "../../createListing/constants/serviceListingCategoriesText";
import {BUSINESS_CLASSIFIEDS_CATEGORIES} from "../../createListing/constants/classifiedListingCategoriesText";
import {isValueInArray} from "../../common/utils/generalUtils";
import {checkIfErrorsExistInMapping, validateInput} from "../../registration/registrationUtils";
import {
    getInitialCategoryFilter,
    getInitialSearchAreaFilter,
    getInitialSubcategoriesFilter
} from "../searchListingUtils";

function SearchListingFiltersContainer(props) {
    const {
        onSearch,
        searchFilters,
        setSearchFilters
    } = props;

    const listingPage = useContext(listingContext);

    const [selectedCategory, setSelectedCategory] = useState(getInitialCategoryFilter(searchFilters));
    const [categoryOptions, setCategoryOptions] = useState(
        (listingPage === PAGE_NAMES.SERVICES
            ? BUSINESS_SERVICE_CATEGORIES_DROPDOWN
            : BUSINESS_CLASSIFIEDS_CATEGORIES_DROPDOWN));
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState(getInitialSubcategoriesFilter(searchFilters));
    const [searchArea, setSearchArea] = useState(getInitialSearchAreaFilter(searchFilters));
    const [initialRender, setInitialRender] = useState(true);


    // Error Validation
    const [hasClickedSearch, setHasClickedSearch] = useState(false);
    const [selectedCategoryError, setSelectedCategoryError] = useState(undefined);
    const [selectedSubcategoryError, setSelectedSubcategoryError] = useState(undefined);
    const [searchAreaProvinceError, setSearchAreaProvinceError] = useState(undefined);
    const [searchAreaCityError, setSearchAreaCityError] = useState(undefined);
    const [searchAreaRadiusError, setSearchAreaRadiusError] = useState(undefined);

    // Update Validation after a category has been selected
    useEffect(() => {
        (selectedCategory !== undefined && validateInput(selectedCategory, setSelectedCategoryError));
    }, [selectedCategory, listingPage]);

    useEffect(() => {
        if(selectedCategory !== MEMBER_SERVICE_CATEGORIES.MEMBER_HOME){
        ((hasClickedSearch && !selectedSubcategories.length)
            ? setSelectedSubcategoryError(true)
            : setSelectedSubcategoryError(false))
        }
    }, [hasClickedSearch, selectedSubcategories, selectedCategory]);

    // Update Category Options Based on Page
    useEffect(() => {
        (listingPage === PAGE_NAMES.SERVICES
            ? setCategoryOptions(MEMBER_SERVICE_CATEGORIES_DROPDOWN.concat(BUSINESS_SERVICE_CATEGORIES_DROPDOWN))
            : setCategoryOptions(BUSINESS_CLASSIFIEDS_CATEGORIES_DROPDOWN));
    }, [listingPage]);

    // TODO: replace with a custom hook that tracks the first render
    //  - https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render
    useEffect(() => {
        // reset selected categories except for on the first render
        if (initialRender) {
            setInitialRender(false);
        } else {
            // reset selected subcategories when category is changed
            setSelectedSubcategories([]);
        }

        // Update subcategories based on Category selected
        returnSubcategory(selectedCategory);
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
            searchAreaProvince: false,
            searchAreaCity: false,
            searchAreaRadius: false,
        }

        // Search Criteria Validation
        searchErrors.selectedCategory = validateInput(selectedCategory, setSelectedCategoryError);
        if (selectedCategory !== MEMBER_SERVICE_CATEGORIES.MEMBER_HOME) {
            searchErrors.selectedSubcategory = validateInput(selectedSubcategories, setSelectedSubcategoryError)
        }
        searchErrors.searchAreaProvince = validateInput(searchArea.province, setSearchAreaProvinceError);
        searchErrors.searchAreaCity = validateInput(searchArea.city, setSearchAreaCityError);
        searchErrors.searchAreaRadius = validateInput(searchArea.radius, setSearchAreaRadiusError);


        // check search criteria for errors
        return !checkIfErrorsExistInMapping(searchErrors);
    }

    const onSubmit = () => {
        setHasClickedSearch(true);
        if (isFormValid()) {
            setSearchFilters({
                category: selectedCategory,
                subcategories: selectedSubcategories,
                searchArea: searchArea
            });
            onSearch({
                selectedCategory,
                selectedSubcategories,
                searchArea
            });
        }
    }

    return (
        <SearchListingFilters
            searchArea={searchArea}
            handleSearchAreaChange={setSearchArea}

            categoryOptions={categoryOptions}
            selectedCategory={selectedCategory}
            subcategories={subcategories}
            selectedSubcategories={selectedSubcategories}

            handleSubcategoriesChange={handleSubcategoriesChange}
            handleCategoryChange={handleCategoryChange}

            selectedCategoryError={selectedCategoryError}
            selectedSubcategoryError={selectedSubcategoryError}

            searchAreaProvinceError={searchAreaProvinceError}
            searchAreaCityError={searchAreaCityError}
            searchAreaRadiusError={searchAreaRadiusError}

            onSubmit={onSubmit}
        />
    );
}

SearchListingFiltersContainer.propTypes = {
    onSearch: PropTypes.func.isRequired,
    searchFilters: PropTypes.shape({
        searchArea: PropTypes.shape({
            province: PropTypes.string,
            city: PropTypes.string,
            radius: PropTypes.number
        }),
        category: PropTypes.string,
        subcategories: PropTypes.array
    }),
    setSearchFilters: PropTypes.func.isRequired
}

export default SearchListingFiltersContainer;
