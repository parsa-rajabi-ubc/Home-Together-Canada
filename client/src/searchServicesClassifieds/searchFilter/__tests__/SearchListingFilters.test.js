/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Search Listing Filter Container Test
 *
 */

import React from 'react';
// import renderer from  'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import SearchListingFilters from "../SearchListingFilters";
import {BUSINESS_CLASSIFIEDS_CATEGORIES} from "../../../createListing/constants/classifiedListingCategoriesText";
import {
    BUSINESS_SERVICE_CATEGORIES,
} from "../../../createListing/constants/serviceListingCategoriesText";
import {
    BUSINESS_CLASSIFIEDS_CATEGORIES_DROPDOWN,
    RENTALS_SUBCATEGORIES_LIST
} from "../../../createListing/constants/classifiedListingConstants";
import {
    BUSINESS_SERVICE_CATEGORIES_DROPDOWN,
    CO_HOUSING_SUBCATEGORIES_LIST
} from "../../../createListing/constants/serviceListingConstants";

describe('SearchListingFilters', () => {
    describe('Container test', () => {
        it('should match snapshot test with Classifieds Category with Errors set to true', () => {
            //given
            const props = {
                handleSearchAreaChange: jest.fn(),

                categoryOptions: BUSINESS_CLASSIFIEDS_CATEGORIES_DROPDOWN,
                selectedCategory: BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS,
                subcategories: [RENTALS_SUBCATEGORIES_LIST],

                handleSubcategoriesChange: jest.fn(),
                handleCategoryChange: jest.fn(),

                selectedCategoryError: true,
                selectedSubcategoryError: true,
                searchAreaProvinceError: true,
                searchAreaCityError: true,
                searchAreaRadiusError: true,

                onSubmit: jest.fn(),
            }

            //when
            const renderer = new ShallowRenderer();
            renderer.render(<SearchListingFilters {...props}/>);
            const tree = renderer.getRenderOutput();

            //then
            expect(tree).toMatchSnapshot();
        });
        it('should match snapshot test with Services Category with Errors set to true', () => {
            //given
            const props = {
                handleSearchAreaChange: jest.fn(),

                categoryOptions: BUSINESS_SERVICE_CATEGORIES_DROPDOWN,
                selectedCategory: BUSINESS_SERVICE_CATEGORIES.CO_HOUSING,
                subcategories: [CO_HOUSING_SUBCATEGORIES_LIST],

                handleSubcategoriesChange: jest.fn(),
                handleCategoryChange: jest.fn(),

                selectedCategoryError: true,
                selectedSubcategoryError: true,
                searchAreaProvinceError: true,
                searchAreaCityError: true,
                searchAreaRadiusError: true,

                onSubmit: jest.fn(),
            }

            //when
            const renderer = new ShallowRenderer();
            renderer.render(<SearchListingFilters {...props}/>);
            const tree = renderer.getRenderOutput();

            //then
            expect(tree).toMatchSnapshot();
        });
        it('should match snapshot test with Classifieds Category with Errors set to false', () => {
            //given
            const props = {
                handleSearchAreaChange: jest.fn(),

                categoryOptions: BUSINESS_CLASSIFIEDS_CATEGORIES_DROPDOWN,
                selectedCategory: BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS,
                subcategories: [RENTALS_SUBCATEGORIES_LIST],

                handleSubcategoriesChange: jest.fn(),
                handleCategoryChange: jest.fn(),

                selectedCategoryError: false,
                selectedSubcategoryError: false,
                searchAreaProvinceError: false,
                searchAreaCityError: false,
                searchAreaRadiusError: false,

                onSubmit: jest.fn(),
            }

            //when
            const renderer = new ShallowRenderer();
            renderer.render(<SearchListingFilters {...props}/>);
            const tree = renderer.getRenderOutput();

            //then
            expect(tree).toMatchSnapshot();
        });
        it('should match snapshot test with Services Category with Errors set to false', () => {
            //given
            const props = {
                handleSearchAreaChange: jest.fn(),

                categoryOptions: BUSINESS_SERVICE_CATEGORIES_DROPDOWN,
                selectedCategory: BUSINESS_SERVICE_CATEGORIES.CO_HOUSING,
                subcategories: [CO_HOUSING_SUBCATEGORIES_LIST],

                handleSubcategoriesChange: jest.fn(),
                handleCategoryChange: jest.fn(),

                selectedCategoryError: false,
                selectedSubcategoryError: false,
                searchAreaProvinceError: false,
                searchAreaCityError: false,
                searchAreaRadiusError: false,

                onSubmit: jest.fn(),
            }

            //when
            const renderer = new ShallowRenderer();
            renderer.render(<SearchListingFilters {...props}/>);
            const tree = renderer.getRenderOutput();

            //then
            expect(tree).toMatchSnapshot();
        });
    });
});