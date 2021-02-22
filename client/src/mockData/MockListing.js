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

var faker = require('faker');

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