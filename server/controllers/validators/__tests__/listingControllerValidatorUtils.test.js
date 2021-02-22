/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.20
 *
 * @Description: tests for listingControllerValidatorUtils functions
 *
 */
const listingControllerValidatorUtils = require('../listingControllerValidatorUtils');

describe('listingControllerValidatorUtils', () => {

    describe('isValidBusinessListingCategory', () => {
        it.each`
            category                                                                            | expected
            ${'Co-housing, Co-ops, Intergenerational & Planned Neighbourhoods'}                  | ${true}
            ${'Home Share Facilitation & Supporting Services'}                                  | ${true}
            ${'Home Sharing Businesses, Groups and Organizations'}                              | ${true}
            ${'Government & Human Service Agencies Offering Shared Living & Support Services'}  | ${true}
            ${'Rentals'}                                                                        | ${true}
            ${'House & Yard Services'}                                                          | ${true}
            ${'Classes, Clubs & Events'}                                                        | ${true}
            ${'Members with Homes to Share'}                                                    | ${false}
            ${undefined}                                                                        | ${false}
            ${null}                                                                             | ${false}
            ${''}                                                                               | ${false}
        `('returns $expected when $category is provided',
            ({ category, expected }) => {
                expect(listingControllerValidatorUtils.isValidBusinessListingCategory(category)).toBe(expected);
            }
        );
    });

    describe('isValidServiceListingCategory', () => {
        it.each`
            category                                                                            | expected
            ${'Co-housing, Co-ops, Intergenerational & Planned Neighbourhoods'}                  | ${true}
            ${'Home Share Facilitation & Supporting Services'}                                  | ${true}
            ${'Home Sharing Businesses, Groups and Organizations'}                              | ${true}
            ${'Government & Human Service Agencies Offering Shared Living & Support Services'}  | ${true}
            ${'Rentals'}                                                                        | ${false}
            ${'House & Yard Services'}                                                          | ${false}
            ${'Classes, Clubs & Events'}                                                        | ${false}
            ${'Members with Homes to Share'}                                                    | ${true}
            ${undefined}                                                                        | ${false}
            ${null}                                                                             | ${false}
            ${''}                                                                               | ${false}
        `('returns $expected when $category is provided',
            ({ category, expected }) => {
                expect(listingControllerValidatorUtils.isValidServiceListingCategory(category)).toBe(expected);
            }
        );
    });

    describe('isValidClassifiedCategory', () => {
        it.each`
            category                                                                            | expected
            ${'Co-housing, Co-ops, Intergenerational & Planned Neighbourhoods'}                  | ${false}
            ${'Home Share Facilitation & Supporting Services'}                                  | ${false}
            ${'Home Sharing Businesses, Groups and Organizations'}                              | ${false}
            ${'Government & Human Service Agencies Offering Shared Living & Support Services'}  | ${false}
            ${'Rentals'}                                                                        | ${true}
            ${'House & Yard Services'}                                                          | ${true}
            ${'Classes, Clubs & Events'}                                                        | ${true}
            ${'Members with Homes to Share'}                                                    | ${false}
            ${undefined}                                                                        | ${false}
            ${null}                                                                             | ${false}
            ${''}                                                                               | ${false}
        `('returns $expected when $category is provided',
            ({ category, expected }) => {
                expect(listingControllerValidatorUtils.isValidClassifiedCategory(category)).toBe(expected);
            }
        );
    });

    describe('isValidCategoryForListingType', () => {
        const service = 'service';
        const classified = 'classified';

        describe('throws an error', () => {
            it.each`
            category                                                                            | type
            ${'Co-housing, Co-ops, Intergenerational & Planned Neighbourhoods'}                  | ${classified}
            ${'Home Share Facilitation & Supporting Services'}                                  | ${classified}
            ${'Home Sharing Businesses, Groups and Organizations'}                              | ${classified}
            ${'Government & Human Service Agencies Offering Shared Living & Support Services'}  | ${classified}
            ${'Rentals'}                                                                        | ${service}
            ${'House & Yard Services'}                                                          | ${service}
            ${'Classes, Clubs & Events'}                                                        | ${service}
            ${'Members with Homes to Share'}                                                    | ${classified}
        `('throws error when $category and $type is provided',
                ({ category, type }) => {
                    expect(() => listingControllerValidatorUtils.isValidCategoryForListingType(category, type))
                        .toThrowError(`${category} is not a valid category for ${type} listings`);
                }
            );
        });

        describe('returns true', () => {
            it.each`
            category                                                                            | type
            ${'Co-housing, Co-ops, Intergenerational & Planned Neighbourhoods'}                  | ${service}
            ${'Home Share Facilitation & Supporting Services'}                                  | ${service}
            ${'Home Sharing Businesses, Groups and Organizations'}                              | ${service}
            ${'Government & Human Service Agencies Offering Shared Living & Support Services'}  | ${service}
            ${'Rentals'}                                                                        | ${classified}
            ${'House & Yard Services'}                                                          | ${classified}
            ${'Classes, Clubs & Events'}                                                        | ${classified}
            ${'Members with Homes to Share'}                                                    | ${service}
        `('returns $expected when $category is provided',
                ({ category, type }) => {
                    expect(listingControllerValidatorUtils.isValidCategoryForListingType(category, type))
                        .toBe(true);
                }
            );
        });
    });
});
