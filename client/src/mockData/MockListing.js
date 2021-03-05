/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.02.20
 *
 * @Description: Mock Listing
 *
 */
import {
    BUSINESS_SERVICE_CATEGORIES, MEMBER_SERVICE_CATEGORIES
} from "../createListing/constants/serviceListingCategoriesText";
import {BUSINESS_CLASSIFIEDS_CATEGORIES} from "../createListing/constants/classifiedListingCategoriesText";
import * as faker from 'faker'

export const mockServiceListings = [
    //CO-HOUSING 0
    {
        title: faker.lorem.words(),
        category: BUSINESS_SERVICE_CATEGORIES.CO_HOUSING,
        fullDescription: faker.lorem.paragraph(),
        contactName: faker.name.findName(),
        unitsForSale: faker.random.number(),
        unitsForRent: faker.random.number(),
    },
    // SHARED HOME 1
    {
        title: faker.lorem.words(),
        category: BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES,
        fullDescription: faker.lorem.paragraph(),
        pictures: faker.image.cats(),
        ratesAndFees: faker.random.number() + " " + faker.random.words(),
    },
    // SHARED BUSINESS 2
    {
        title: faker.lorem.words(),
        category: BUSINESS_SERVICE_CATEGORIES.SHARED_BUSINESS_SERVICES,
        fullDescription: faker.lorem.paragraph(),
        pictures: faker.image.cats(),
        ratesAndFees: faker.random.number() + " " + faker.random.words(),
    },
    // GOVERNMENT 3
    {
        title: faker.lorem.words(),
        category: BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES,
        fullDescription: faker.lorem.paragraph(),
        contactName: faker.name.findName(),
        contactPhoneNumber: faker.phone.phoneNumber(),
    },
    // MEMBER HOME TO SHARE 4
    {
        title: faker.lorem.words(),
        category: MEMBER_SERVICE_CATEGORIES.MEMBER_HOME,
        fullDescription: faker.lorem.paragraph(),

        generalLocation: faker.address.zipCode(),
        monthlyCost: faker.random.number(),
        pictures: faker.image.cats(),
        numBed: faker.random.number(),
        numBath: faker.random.number(),
        petFriendly: faker.random.boolean(),
        smokeFriendly: faker.random.boolean(),
        utilIncluded: faker.random.boolean(),
    }
]

export const mockClassifiedsListings = [
    //RENTALS 0
    {
        title: faker.lorem.words(),
        category: BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS,
        fullDescription: faker.lorem.paragraph(),

        price: faker.random.number(),
        pictures: faker.image.cats(),
        ratesAndFees: faker.random.number() + " " + faker.random.words(),
        numBed: faker.random.number(),
        numBath: faker.random.number(),
        furnished: faker.random.boolean(),
        petFriendly: faker.random.boolean(),
        smokeFriendly: faker.random.boolean(),
    },
    // HOUSE_YARD 1
    {
        title: faker.lorem.words(),
        category: BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD,
        fullDescription: faker.lorem.paragraph(),

        pictures: faker.image.cats(),
        ratesAndFees: faker.random.number() + " " + faker.random.words(),
    },
    // LEGAL_SALES 2
    {
        title: faker.lorem.words(),
        category: BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES,
        fullDescription: faker.lorem.paragraph(),

        pictures: faker.image.cats(),
        ratesAndFees: faker.random.number() + " " + faker.random.words(),
    },
    // CLASSES_CLUBS 3
    {
        title: faker.lorem.words(),
        category: BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS,
        fullDescription: faker.lorem.paragraph(),

        contactName: faker.name.findName(),
        contactPhoneNumber: faker.phone.phoneNumber(),
        pictures: faker.image.cats(),
        ratesAndFees: faker.random.number() + " " + faker.random.words(),
        eventDateTime: faker.date.soon() + " " + faker.time.recent()
    }
]

export const mockBusinessListingResponse = {
    "id": 6,
    "uid": 2,
    "title": "A Local Calligraphy Classes",
    "shortDescription": "Calligraphy for beginners",
    "fullDescription": "Lorem ipsum dolor .",
    "rateAndFees": "March 1 2021, 10:00 AM",
    "contactName": "Betsy",
    "contactPhoneNumber": 4036527153,
    "eventDateTime": 4036527153,
    "isClassified": true,
    "createdAt": "2021-02-23T18:54:05.000Z",
    "updatedAt": "2021-02-23T18:54:05.000Z",
    "categoryName": "Classes, Clubs & Events",
    "business": {
        "username": "apples0",
        "email": "apples0@gelden.com",
        "uid": 2,
        "businessName": "Bob's Bricks",
        "logo": null,
        "isIncorporated": false,
        "incorporatedOwnersNames": null,
        "businessPhoneNumber": "333-333-3333",
        "businessCellPhoneNumber": "444-444-4444",
        "isNationWide": true,
        "mapAddressLine1": null,
        "mapAddressLine2": null,
        "mapCity": null,
        "mapProvince": null,
        "mapPostalCode": null,
        "mapLatitude": "36.0195234",
        "mapLongitude": "14.2385650",
        "website": "www.google.com",
        "createdAt": "2021-02-23T18:54:01.000Z",
        "updatedAt": "2021-02-23T18:54:01.000Z"
    }
}

export const mockMemberListingResponse = {
    "id": 18,
    "uid": 5,
    "title": "Empty Room in Condo",
    "shortDescription": "Looking for an easy going roommate",
    "fullDescription": "Lorem ipsum .",
    "monthlyCost": 600,
    "numBed": 2,
    "numBath": 1,
    "petFriendly": true,
    "smokeFriendly": false,
    "postalCode": "T2V1S5",
    "utilitiesIncluded": true,
    "isClassified": false,
    "createdAt": "2021-02-24T01:31:58.000Z",
    "updatedAt": "2021-02-24T01:31:58.000Z",
    "categoryName": "Members with Homes to Share"
}
