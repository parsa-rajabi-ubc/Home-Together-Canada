/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.21
 *
 * @Description: Tests for util functions used for listings
 *
 */

import {resolveCategoryToListingType, LISTING_TYPE} from "../ListingUtils";
import {
    BUSINESS_SERVICE_CATEGORIES,
    MEMBER_SERVICE_CATEGORIES
} from "../../../createListing/constants/serviceListingCategoriesText";
import {BUSINESS_CLASSIFIEDS_CATEGORIES} from "../../../createListing/constants/classifiedListingCategoriesText";

describe('resolveCategoryToListingType', () => {
    describe('unit test', () => {
        it('should return service when category is services', () => {
            // given
            const category = MEMBER_SERVICE_CATEGORIES.MEMBER_HOME;

            // when
            const result = resolveCategoryToListingType(category);

            // then
            expect(result).toBe(LISTING_TYPE.SERVICE);
        });
        it('should return service when category is services', () => {
            // given
            const category = BUSINESS_SERVICE_CATEGORIES.CO_HOUSING;

            // when
            const result = resolveCategoryToListingType(category);

            // then
            expect(result).toBe(LISTING_TYPE.SERVICE);
        });
        it('should return service when category is services', () => {
            // given
            const category = BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES;

            // when
            const result = resolveCategoryToListingType(category);

            // then
            expect(result).toBe(LISTING_TYPE.SERVICE);
        });
        it('should return service when category is services', () => {
            // given
            const category = BUSINESS_SERVICE_CATEGORIES.SHARED_BUSINESS_SERVICES;

            // when
            const result = resolveCategoryToListingType(category);

            // then
            expect(result).toBe(LISTING_TYPE.SERVICE);
        });
        it('should return service when category is services', () => {
            // given
            const category = BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES;

            // when
            const result = resolveCategoryToListingType(category);

            // then
            expect(result).toBe(LISTING_TYPE.SERVICE);
        });




        it('should return classified when category is classified', () => {
            // given
            const category = BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS;

            // when
            const result = resolveCategoryToListingType(category);

            // then
            expect(result).toBe(LISTING_TYPE.CLASSIFIED);
        });
        it('should return classified when category is classified', () => {
            // given
            const category = BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD;

            // when
            const result = resolveCategoryToListingType(category);

            // then
            expect(result).toBe(LISTING_TYPE.CLASSIFIED);
        });
        it('should return classified when category is classified', () => {
            // given
            const category = BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES;

            // when
            const result = resolveCategoryToListingType(category);

            // then
            expect(result).toBe(LISTING_TYPE.CLASSIFIED);
        });
        it('should return classified when category is classified', () => {
            // given
            const category = BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS;

            // when
            const result = resolveCategoryToListingType(category);

            // then
            expect(result).toBe(LISTING_TYPE.CLASSIFIED);
        });

    })
})
