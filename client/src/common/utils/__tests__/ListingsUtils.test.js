/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.21
 *
 * @Description: Tests for util functions used for listings
 *
 */


import {resolveCategoryToListingType, LISTING_TYPE} from "../listingsUtils.js";
import {
    BUSINESS_SERVICE_CATEGORIES,
    MEMBER_SERVICE_CATEGORIES
} from "../../../createListing/constants/serviceListingCategoriesText";
import {BUSINESS_CLASSIFIEDS_CATEGORIES} from "../../../createListing/constants/classifiedListingCategoriesText";

describe('listingsUtils', () => {
    describe('resolveCategoryToListingType', () => {
        it.each`
            category                                                               | expected
            ${MEMBER_SERVICE_CATEGORIES.MEMBER_HOME}                               | ${LISTING_TYPE.SERVICE}
            ${BUSINESS_SERVICE_CATEGORIES.CO_HOUSING}                              | ${LISTING_TYPE.SERVICE}
            ${BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES}                    | ${LISTING_TYPE.SERVICE}
            ${BUSINESS_SERVICE_CATEGORIES.SHARED_BUSINESS_SERVICES}                | ${LISTING_TYPE.SERVICE}
            ${BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES}                     | ${LISTING_TYPE.SERVICE}
            ${BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS}                             | ${LISTING_TYPE.CLASSIFIED}
            ${BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD}                          | ${LISTING_TYPE.CLASSIFIED}
            ${BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES}                         | ${LISTING_TYPE.CLASSIFIED}
            ${BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS}                       | ${LISTING_TYPE.CLASSIFIED}

        `('returns $expected when $category is provided',
            ({category, expected}) => {
                expect(resolveCategoryToListingType(category)).toBe(expected);
            }
        );
    });
})
