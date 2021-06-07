/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.21
 *
 * @Description: utility functions to abstract manipulation of data in listing controllers
 *
 */

const pick = require('lodash/pick');
const get = require('lodash/get');
const fs = require('fs');

const {LISTING_IMAGE_UPLOADS_PATH} = require("../../constants/listingConstants");
const {
    BUSINESS_SERVICES_CATEGORIES,
    MEMBER_SERVICE_CATEGORIES,
    BUSINESS_CLASSIFIEDS_CATEGORIES,
    CO_HOUSING_SUBCATEGORIES_ARRAY,
    SHARED_HOME_SERVICES_SUBCATEGORIES_ARRAY,
    SHARED_BUSINESS_SERVICES_SUBCATEGORIES_ARRAY,
    GOVERNMENT_SERVICES_SUBCATEGORIES_ARRAY,
    RENTALS_SUBCATEGORIES_ARRAY,
    HOUSE_YARD_SERVICES_SUBCATEGORIES_ARRAY,
    LEGAL_SALES_AGENCIES_SUBCATEGORIES_ARRAY,
    CLASSES_CLUBS_EVENTS_SUBCATEGORIES_ARRAY
} = require('../../constants/listingConstants')

const COMMON_FIELDS = ['title', 'shortDescription', 'fullDescription'];
const CO_HOUSING_FIELDS = [...COMMON_FIELDS, 'contactName', 'unitsForSale', 'unitsForRent'];
const HOME_SHARE_FACILITATION_BUSINESS_FIELDS = [...COMMON_FIELDS, 'rateAndFees'];
const GOVERNMENT_FIELDS = [...COMMON_FIELDS, 'contactName', 'contactPhoneNumber'];
const RENTAL_FIELDS = [...COMMON_FIELDS, 'monthlyCost', 'numBed', 'numBath', 'petFriendly', 'smokeFriendly', 'furnished'];
const HOUSE_YARD_FIELDS = [...COMMON_FIELDS, 'rateAndFees'];
const LEGAL_SALES_FIELDS = [...COMMON_FIELDS, 'rateAndFees'];
const EVENTS_CLUBS_FIELDS = [...COMMON_FIELDS, 'rateAndFees', 'contactName', 'contactPhoneNumber', 'eventDateTime'];
const MEMBER_HOME_FIELDS = [
    ...COMMON_FIELDS,
    'monthlyCost',
    'numBed',
    'numBath',
    'petFriendly',
    'smokeFriendly',
    'utilitiesIncluded',
    'addressLine1',
    'addressLine2',
    'city',
    'province',
    'postalCode'
];

// TODO: write test for this function
const getListingFields = (req, category) => {
    switch (category) {
        case BUSINESS_SERVICES_CATEGORIES.CO_HOUSING: {
            return pick(req.body, CO_HOUSING_FIELDS);
        }
        case BUSINESS_SERVICES_CATEGORIES.SHARED_HOME_SERVICES: {
            return pick(req.body, HOME_SHARE_FACILITATION_BUSINESS_FIELDS);
        }
        case BUSINESS_SERVICES_CATEGORIES.SHARED_BUSINESS_SERVICES: {
            return pick(req.body, HOME_SHARE_FACILITATION_BUSINESS_FIELDS);
        }
        case BUSINESS_SERVICES_CATEGORIES.GOVERNMENT_SERVICES: {
            return pick(req.body, GOVERNMENT_FIELDS);
        }
        case BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS: {
            return pick(req.body, RENTAL_FIELDS);
        }
        case BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD: {
            return pick(req.body, HOUSE_YARD_FIELDS);
        }
        case BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES: {
            return pick(req.body, LEGAL_SALES_FIELDS);
        }
        case BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS: {
            return pick(req.body, EVENTS_CLUBS_FIELDS);
        }
        case MEMBER_SERVICE_CATEGORIES.MEMBER_HOME: {
            return pick(req.body, MEMBER_HOME_FIELDS);
        }
    }
}

const resolveCategoryToSubcategory = (category) => {
    switch (category) {
        case BUSINESS_SERVICES_CATEGORIES.CO_HOUSING:
            return CO_HOUSING_SUBCATEGORIES_ARRAY;
        case BUSINESS_SERVICES_CATEGORIES.SHARED_HOME_SERVICES:
            return SHARED_HOME_SERVICES_SUBCATEGORIES_ARRAY;
        case BUSINESS_SERVICES_CATEGORIES.SHARED_BUSINESS_SERVICES:
            return SHARED_BUSINESS_SERVICES_SUBCATEGORIES_ARRAY;
        case BUSINESS_SERVICES_CATEGORIES.GOVERNMENT_SERVICES:
            return GOVERNMENT_SERVICES_SUBCATEGORIES_ARRAY;
        case BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS:
            return RENTALS_SUBCATEGORIES_ARRAY;
        case BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD:
            return HOUSE_YARD_SERVICES_SUBCATEGORIES_ARRAY;
        case BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES:
            return LEGAL_SALES_AGENCIES_SUBCATEGORIES_ARRAY;
        case BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS:
            return CLASSES_CLUBS_EVENTS_SUBCATEGORIES_ARRAY;
    }
}

const formatBusinessListing = (listing) => {
    const listingDetails = pick(
        listing.dataValues,
        [
            'id',
            'uid',
            'isDeleted',
            'dateExpired',
            'dateAdminApproved',
            'isClassified',
            'orderId',
            'createdAt',
            'updatedAt'
        ]
    );

    const listingFields = JSON.parse(get(listing.dataValues, 'fields'));

    const abstractUser = pick(
        listing.dataValues.AbstractUser.dataValues,
        [
            'username',
            'email',
            'firstName',
            'lastName',
            'phoneNumber',
            'addressLine1',
            'addressLine2',
            'city',
            'province',
            'postalCode'
        ]
    );
    console.log('listing.dataValues.AbstractUser.dataValues.BusinessAccount: ', listing.dataValues.AbstractUser.dataValues.BusinessAccount);
    const businessAccount = pick(
        listing.dataValues.AbstractUser.dataValues.BusinessAccount.dataValues,
        [
            'businessName',
            'logo',
            'isIncorporated',
            'incorporatedOwnersNames',
            'businessPhoneNumber',
            'businessCellPhoneNumber',
            'isNationWide',
            'mapAddressLine1',
            'mapAddressLine2',
            'mapCity',
            'mapProvince',
            'mapPostalCode',
            'website'
        ]
    );

    const category = get(
        listing.dataValues.ListingCategory.dataValues,
        'name'
    );

    const subcategories = listing.dataValues.ListingSubcategories.map(subcategory => {
        return get(subcategory.dataValues, 'name');
    });

    return {
        ...listingDetails,
        ...listingFields,
        ...abstractUser,
        ...businessAccount,
        category,
        subcategories
    }
}

const formatMemberListing = listing => {
    return {
        id: listing.dataValues.id,
        uid: listing.dataValues.uid,
        ...(JSON.parse(listing.dataValues.fields)),
        isClassified: listing.dataValues.isClassified,
        createdAt: listing.dataValues.createdAt,
        updatedAt: listing.dataValues.updatedAt,
        categoryName: listing.dataValues.ListingCategory.dataValues.name,
        images: getListingImages(listing.dataValues.id)
    }
}

const getListingImages = id => {
    const destinationDirectory = LISTING_IMAGE_UPLOADS_PATH + id + '/';
    if (fs.existsSync(destinationDirectory)) {
        const filenames = fs.readdirSync(destinationDirectory);

        // note when navigating to assets on the server via URL, the application automatically goes to server/public/
        return filenames ? filenames.map(file => 'uploads/listings/' + id + '/' + file) : [];
    } else {
        return [];
    }
}

module.exports = {
    getListingFields,
    resolveCategoryToSubcategory,
    formatBusinessListing,
    formatMemberListing,
    getListingImages
}
