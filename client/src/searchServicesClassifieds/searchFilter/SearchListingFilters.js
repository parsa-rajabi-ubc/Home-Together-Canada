/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Search Filter Component
 *
 */

import React, {useContext} from 'react';
import PropTypes from "prop-types";
import SubmitButton from "../../common/forms/SubmitButton";
import Dropdown from "../../common/forms/Dropdown";
import {dropdownDefaultCSS, dropdownErrorCSS} from "../../css/dropdownCSSUtil";
import {listingContext} from "../SearchListingContainer";
import Checkbox from "../../common/forms/Checkbox";
import {CREATE_LISTING_CONTROLS_TEXT} from "../../createListing/CreateListingControls";
import SearchArea from "../../common/listings/SearchArea";
import {MEMBER_SERVICE_CATEGORIES} from "../../createListing/constants/serviceListingCategoriesText";

const TEXT = {
    DROPDOWN: CREATE_LISTING_CONTROLS_TEXT.SELECT_LISTING_CATEGORY,
    CHECKBOX: "Select Subcategories",
}

function SearchListingFilters(props) {
    const {
        handleSearchAreaChange,
        searchArea,

        categoryOptions,
        selectedCategory,
        subcategories,

        handleSubcategoriesChange,
        handleCategoryChange,

        selectedCategoryError,
        selectedSubcategoryError,

        searchAreaProvinceError,
        searchAreaCityError,
        searchAreaRadiusError,

        onSubmit,
    } = props;

    const listingPage = useContext(listingContext);

    const subcategoryCheckboxes = subcategories.map(
        (subcategory, index) =>
            <Checkbox
                key={subcategory + index}
                label={subcategory.toString()}
                id={subcategory.toString()}
                fontNormal={true}
                onChange={handleSubcategoriesChange}
            />
    );

    return (
        <div className="col-start-1 col-end-7 py-5 px-5 m-6 bg-white shadow-lg rounded-xl">
            <div className="grid grid-cols-2 gap-6">
                <div className="col-span-3 sm:col-span-2">
                    <label className="text-2xl font-medium">Search Filtering</label>
                    <SubmitButton
                        inputValue={"Search"}
                        className="btn btn-green w-1/4 float-right py-2"
                        onClick={onSubmit}
                    />

                    <section className={"my-8"} key={listingPage}>
                        <section className={"mb-4"}>
                            <label className="label text-lg mb-1">Search Area</label>
                            <SearchArea
                                searchArea={searchArea}
                                onChange={handleSearchAreaChange}
                                searchAreaProvinceError={searchAreaProvinceError}
                                searchAreaCityError={searchAreaCityError}
                                searchAreaRadiusError={searchAreaRadiusError}
                            />
                        </section>

                        <label className="label text-lg mb-1">{TEXT.DROPDOWN}</label>
                        <Dropdown
                            options={categoryOptions}
                            onChange={handleCategoryChange}
                            dropdownCSS={selectedCategoryError ? dropdownErrorCSS : dropdownDefaultCSS}
                        />
                    </section>

                    {(selectedCategory && selectedCategory !== MEMBER_SERVICE_CATEGORIES.MEMBER_HOME)  &&
                    <section className={`${selectedSubcategoryError && "pl-1 border rounded-lg border-red-500"} my-4`}>
                        <p className={"label text-lg mb-1"}>{TEXT.CHECKBOX}</p>
                        {subcategoryCheckboxes}
                    </section>
                    }

                </div>

            </div>
        </div>
    );
}

SearchListingFilters.propTypes = {
    handleSearchAreaChange: PropTypes.func.isRequired,
    searchArea: PropTypes.shape({
        province: PropTypes.string,
        city: PropTypes.string,
        radius: PropTypes.number
    }),

    categoryOptions: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string,
    subcategories: PropTypes.array.isRequired,

    handleSubcategoriesChange: PropTypes.func.isRequired,
    handleCategoryChange: PropTypes.func.isRequired,

    selectedCategoryError: PropTypes.bool,
    selectedSubcategoryError: PropTypes.bool,

    searchAreaProvinceError: PropTypes.bool,
    searchAreaCityError: PropTypes.bool,
    searchAreaRadiusError: PropTypes.bool,

    onSubmit: PropTypes.func.isRequired,
};

export default SearchListingFilters;