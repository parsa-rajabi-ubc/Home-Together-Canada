/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.21
 *
 * @Description: Tests for Listing Controller Utils
 *
 */

const {resolveCategoryToSubcategory} = require("../listingControllerUtils");
const {
    BUSINESS_SERVICES_CATEGORIES,
    BUSINESS_CLASSIFIEDS_CATEGORIES,
    CO_HOUSING_SUBCATEGORIES_ARRAY,
    SHARED_HOME_SERVICES_SUBCATEGORIES_ARRAY,
    SHARED_BUSINESS_SERVICES_SUBCATEGORIES_ARRAY,
    GOVERNMENT_SERVICES_SUBCATEGORIES_ARRAY,
    RENTALS_SUBCATEGORIES_ARRAY,
    HOUSE_YARD_SERVICES_SUBCATEGORIES_ARRAY,
    LEGAL_SALES_AGENCIES_SUBCATEGORIES_ARRAY,
    CLASSES_CLUBS_EVENTS_SUBCATEGORIES_ARRAY
} = require('../../../constants/listingConstants')

describe('listingControllerUtils', () => {
    describe('resolveCategoryToSubcategory', () => {
        it.each`
            category                                                               | expected
            ${BUSINESS_SERVICES_CATEGORIES.CO_HOUSING}                             | ${CO_HOUSING_SUBCATEGORIES_ARRAY}
            ${BUSINESS_SERVICES_CATEGORIES.SHARED_HOME_SERVICES}                   | ${SHARED_HOME_SERVICES_SUBCATEGORIES_ARRAY}
            ${BUSINESS_SERVICES_CATEGORIES.SHARED_BUSINESS_SERVICES}               | ${SHARED_BUSINESS_SERVICES_SUBCATEGORIES_ARRAY}
            ${BUSINESS_SERVICES_CATEGORIES.GOVERNMENT_SERVICES}                    | ${GOVERNMENT_SERVICES_SUBCATEGORIES_ARRAY}
            ${BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS}                             | ${RENTALS_SUBCATEGORIES_ARRAY}
            ${BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD}                          | ${HOUSE_YARD_SERVICES_SUBCATEGORIES_ARRAY}
            ${BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES}                         | ${LEGAL_SALES_AGENCIES_SUBCATEGORIES_ARRAY}
            ${BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS}                       | ${CLASSES_CLUBS_EVENTS_SUBCATEGORIES_ARRAY}

        `('returns $expected when $category is provided',
            ({category, expected}) => {
                expect(resolveCategoryToSubcategory(category)).toBe(expected);
            }
        );
    });
})
