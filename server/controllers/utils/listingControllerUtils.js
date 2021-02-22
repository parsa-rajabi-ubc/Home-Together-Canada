/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.21
 *
 * @Description: utility functions to abstract manipulation of data in listing controllers
 *
 */

const pick = require('lodash/pick');

const {
    BUSINESS_SERVICES_CATEGORIES,
    MEMBER_SERVICE_CATEGORIES,
    BUSINESS_CLASSIFIEDS_CATEGORIES
} = require('../../constants/listingConstants')

const COMMON_FIELDS = ['title', 'shortDescription', 'longDescription'];
const CO_HOUSING_FIELDS = [...COMMON_FIELDS, 'contactName', 'unitsForSale', 'unitsForRent'];
const HOME_SHARE_FACILITATION_BUSINESS_FIELDS = [...COMMON_FIELDS, 'ratesAndFees'];
const GOVERNMENT_FIELDS = [...COMMON_FIELDS, 'contactName', 'contactNumber'];
const RENTAL_FIELDS = [...COMMON_FIELDS, 'monthlyCost', 'numBedrooms', 'numBathrooms', 'petFriendly', 'smokeFriendly', 'isFurnished'];
const HOUSE_YARD_FIELDS = [...COMMON_FIELDS, 'ratesAndFees'];
const LEGAL_SALES_FIELDS = [...COMMON_FIELDS, 'ratesAndFees'];
const EVENTS_CLUBS_FIELDS = [...COMMON_FIELDS, 'ratesAndFees', 'contactName', 'contactNumber', 'eventDateTimes'];
const MEMBER_HOME_FIELDS = [...COMMON_FIELDS, 'monthlyCost', 'numBedrooms', 'numBathrooms', 'petFriendly', 'smokeFriendly', 'postalCode', 'utilitiesIncluded'];

const getListingFields = (req) => {
    switch (req.body.category) {
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

module.exports = {
    getListingFields
}
