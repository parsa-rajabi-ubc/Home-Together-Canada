/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.21
 *
 * @Description: Tests for Listing Controller Utils
 *
 */

const {resolveCategoryToSubcategory, formatBusinessListing, formatMemberListing} = require("../listingControllerUtils");
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

    describe('formatBusinessListing', () => {
        it('should return properly formatted listing object', () => {
            // expected
            const expectedFormattedListing = {
                id: 28,
                uid: 7,
                isDeleted: true,
                dateExpired: null,
                dateAdminApproved: '2021-06-05T18:53:08.000Z',
                isClassified: false,
                orderId: null,
                createdAt: '2021-06-05T18:52:26.000Z',
                updatedAt: '2021-06-05T18:54:35.000Z',
                title: 'Roving Canada',
                shortDescription: 'Live anywhere in Canada',
                fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                contactName: 'Rachelle Gelden',
                contactPhoneNumber: 4033365156,
                username: 'business2',
                email: 'busines2@gelden.com',
                firstName: 'Business',
                lastName: 'Two',
                phoneNumber: '111-111-1111',
                addressLine1: '1 Oak Ave',
                addressLine2: null,
                city: 'Kelowna',
                province: 'BC',
                postalCode: 'T1V1S4',
                businessName: "Bob's Bricks",
                logo: null,
                isIncorporated: false,
                incorporatedOwnersNames: null,
                businessPhoneNumber: '111-111-1111',
                businessCellPhoneNumber: '222-222-2222',
                isNationWide: false,
                mapAddressLine1: '1875 Country Club Drive',
                mapAddressLine2: '1301',
                mapCity: 'Kelowna',
                mapProvince: 'BC',
                mapPostalCode: 'V1V2W7',
                website: 'www.google.com',
                categoryName: 'Government & Human Service Agencies Offering Shared Living & Support Services',
                subcategories: [
                    'Agencies serving Seniors',
                    'Agencies Addressing Low Income Housing'
                ],
                images: []
            };

            // given
            const listing = {
                dataValues: {
                    id: 28,
                    uid: 7,
                    fields: '{"title":"Roving Canada","shortDescription":"Live anywhere in Canada","fullDescription":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","contactName":"Rachelle Gelden","contactPhoneNumber":4033365156}',
                    isDeleted: true,
                    dateExpired: null,
                    dateAdminApproved: '2021-06-05T18:53:08.000Z',
                    isClassified: false,
                    orderId: null,
                    createdAt: '2021-06-05T18:52:26.000Z',
                    updatedAt: '2021-06-05T18:54:35.000Z',
                    ListingCategoryId: 4,
                    AbstractUser: {
                        dataValues: {
                            uid: 7,
                            username: 'business2',
                            password: '�{ٌ\x01 �g\x1Ek�F�G����\x10^\x11M���\x0F��*�2�x\x01E��\n\x14��ȡ��\x00i\x1F֍�~�\x0E��?�B�Ū',
                            salt: '7m+b4R2sjSueEBl23ZBV1w==',
                            email: 'busines2@gelden.com',
                            firstName: 'Business',
                            lastName: 'Two',
                            phoneNumber: '111-111-1111',
                            isBanned: false,
                            authToken: null,
                            addressLine1: '1 Oak Ave',
                            addressLine2: null,
                            city: 'Kelowna',
                            province: 'BC',
                            postalCode: 'T1V1S4',
                            hasDifferentMailingAddress: false,
                            mailingAddressLine1: '1 Oak Ave',
                            mailingAddressLine2: null,
                            mailingCity: 'Kelowna',
                            mailingProvince: 'BC',
                            mailingPostalCode: 'T1V1S4',
                            createdAt: '2021-06-05T18:52:11.000Z',
                            updatedAt: '2021 - 06 - 05T18:52:11.000Z',
                            BusinessAccount: {
                                dataValues: {
                                    uid: 7,
                                    businessName: "Bob's Bricks",
                                    logo: null,
                                    isIncorporated: false,
                                    incorporatedOwnersNames: null,
                                    businessPhoneNumber: '111-111-1111',
                                    businessCellPhoneNumber: '222-222-2222',
                                    isNationWide: false,
                                    mapAddressLine1: '1875 Country Club Drive',
                                    mapAddressLine2: '1301',
                                    mapCity: 'Kelowna',
                                    mapProvince: 'BC',
                                    mapPostalCode: 'V1V2W7',
                                    mapLatitude: '49.9550406',
                                    mapLongitude: '-119.3997087',
                                    website: 'www.google.com',
                                    createdAt: '2021-06-05T18:52:12.000Z',
                                    updatedAt: '2021-06-05T18:52:12.000Z'
                                }
                            }
                        }
                    },
                    ListingCategory: {
                        dataValues: {
                            id: 4,
                            name: 'Government & Human Service Agencies Offering Shared Living & Support Services',
                            isClassified: false,
                            createdAt: '2021-05-27T02:34:39.000Z',
                            updatedAt: '2021-05-27T02:34:39.000Z'
                        },
                    },
                    ListingSubcategories: [
                        {
                            dataValues: {
                                id: 17,
                                name: 'Agencies serving Seniors',
                                createdAt: '2021-05-27T02:34:39.000Z',
                                updatedAt: '2021-05-27T02:34:39.000Z',
                                ListingCategoryId: 4,
                            },
                        },
                        {
                            dataValues: {
                                id: 18,
                                name: 'Agencies Addressing Low Income Housing',
                                createdAt: '2021-05-27T02:34:39.000Z',
                                updatedAt: '2021-05-27T02:34:39.000Z',
                                ListingCategoryId: 4,
                            }
                        }
                    ]
                },

            }

            // when
            const formattedListing = formatBusinessListing(listing);

            // then
            expect(formattedListing).toEqual(expectedFormattedListing);

        })
    });

    describe('formatMemberListing', () => {
        it('should return a properly formatted listing object', () => {
            // expected
            const expectedFormattedListing = {
                id: 27,
                uid: 6,
                title: 'Gloomy Basement Sweet',
                shortDescription: 'Looking for an easy going roommate',
                fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                monthlyCost: 600,
                numBed: 2,
                numBath: 1,
                petFriendly: true,
                smokeFriendly: false,
                utilitiesIncluded: true,
                addressLine1: '1875 Country Club Drive',
                city: 'Kelowna',
                province: 'BC',
                postalCode: 'T1V1S4',
                isClassified: false,
                createdAt: '2021-06-05T18:49:35.000Z',
                updatedAt: '2021-06-05T18:51:07.000Z',
                categoryName: 'Members with Homes to Share',
                images: []
            };

            // given
            const listing = {
                dataValues: {
                    id: 27,
                    uid: 6,
                    fields: '{"title":"Gloomy Basement Sweet","shortDescription":"Looking for an easy going roommate","fullDescription":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","monthlyCost":600,"numBed":2,"numBath":1,"petFriendly":true,"smokeFriendly":false,"utilitiesIncluded":true,"addressLine1":"1875 Country Club Drive","city":"Kelowna","province":"BC","postalCode":"T1V1S4"}',
                    isDeleted: true,
                    dateExpired: null,
                    dateAdminApproved: null,
                    isClassified: false,
                    orderId: null,
                    createdAt: '2021-06-05T18:49:35.000Z',
                    updatedAt: '2021-06-05T18:51:07.000Z',
                    ListingCategoryId: 5,
                    ListingCategory: {
                        dataValues: {
                            id: 5,
                            name: 'Members with Homes to Share',
                            isClassified: false,
                            createdAt: '2021-05-27T02:34:39.000Z',
                            updatedAt: '2021-05-27T02:34:39.000Z'
                        }
                    }
                }
            }

            // when
            const formattedListing = formatMemberListing(listing);

            // then
            expect(formattedListing).toEqual(expectedFormattedListing);
        })
    })
});
