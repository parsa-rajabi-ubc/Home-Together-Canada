/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Search Listing Filter Container Test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
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
        it('should match snapshot test with Classifieds Category', () => {
            //given
            const props = {
                categoryOptions: BUSINESS_CLASSIFIEDS_CATEGORIES_DROPDOWN,
                selectedCategory: BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS,
                subcategories: [RENTALS_SUBCATEGORIES_LIST],
                handleSubcategoriesChange: jest.fn(),
                handleCategoryChange: jest.fn(),
                selectedCategoryError: true,
                selectedSubcategoryError: true,
                onSubmit: jest.fn(),
            }

            //when
            const component = renderer.create(<SearchListingFilters {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
        it('should match snapshot test with Services Category', () => {
            //given
            const props = {
                categoryOptions: BUSINESS_SERVICE_CATEGORIES_DROPDOWN,
                selectedCategory: BUSINESS_SERVICE_CATEGORIES.CO_HOUSING,
                subcategories: [CO_HOUSING_SUBCATEGORIES_LIST],
                handleSubcategoriesChange: jest.fn(),
                handleCategoryChange: jest.fn(),
                selectedCategoryError: true,
                selectedSubcategoryError: true,
                onSubmit: jest.fn(),
            }

            //when
            const component = renderer.create(<SearchListingFilters {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});