/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.19
 *
 * @Description: custom validators to validate input to controller functions to create listings
 *
 */
const includes = require('lodash/includes');

const {
    BUSINESS_SERVICES_CATEGORIES,
    MEMBER_SERVICE_CATEGORIES,
    BUSINESS_CLASSIFIEDS_CATEGORIES,
    LISTING_CATEGORY_SUBCATEGORY_MAP
} = require('../../constants/listingConstants');
const memberAccounts = require('../memberAccountController');

const LISTING_VALIDATION_METHODS = {
    BASIC_LISTING_INFO: 'basicListingInfo',
    LISTING_FIELDS: 'listingFields',
    MEMBER_HOME_FORM: 'membersWithHomeToShareForm',
    CO_HOUSING_FORM: 'cohousingForm',
    HOME_SHARE_FACILITATION_BUSINESS_FORM: 'homeShareFacilitationAndBusinessForm',
    GOVERNMENT_SERVICES_FORM: 'governmentServicesForm',
    RENTALS_FORM: 'rentalsForm',
    HOUSE_YARD_FORM: 'houseAndYardServicesForm',
    LEGAL_SALES_FORM: 'legalAndSalesForm',
    CLASSES_EVENTS_CLUBS_FORM: 'classesClubsEventsForm'
}

const LISTING_TYPES = {
    SERVICE: 'service',
    CLASSIFIED: 'classified'
}

const CATEGORY_FORM_VALIDATION_DICT = new Map([
    [MEMBER_SERVICE_CATEGORIES.MEMBER_HOME, LISTING_VALIDATION_METHODS.MEMBER_HOME_FORM],
    [BUSINESS_SERVICES_CATEGORIES.CO_HOUSING, LISTING_VALIDATION_METHODS.CO_HOUSING_FORM],
    [BUSINESS_SERVICES_CATEGORIES.SHARED_HOME_SERVICES, LISTING_VALIDATION_METHODS.HOME_SHARE_FACILITATION_BUSINESS_FORM],
    [BUSINESS_SERVICES_CATEGORIES.SHARED_BUSINESS_SERVICES, LISTING_VALIDATION_METHODS.HOME_SHARE_FACILITATION_BUSINESS_FORM],
    [BUSINESS_SERVICES_CATEGORIES.GOVERNMENT_SERVICES, LISTING_VALIDATION_METHODS.GOVERNMENT_SERVICES_FORM],
    [BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS, LISTING_VALIDATION_METHODS.RENTALS_FORM],
    [BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD, LISTING_VALIDATION_METHODS.HOUSE_YARD_FORM],
    [BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES, LISTING_VALIDATION_METHODS.LEGAL_SALES_FORM],
    [BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS, LISTING_VALIDATION_METHODS.CLASSES_EVENTS_CLUBS_FORM]
]);

const LISTING_FIELDS_ERRORS = {
    TITLE: 'Missing or invalid value for title',
    SHORT_DESCRIPTION: 'Missing or invalid value for short description',
    LONG_DESCRIPTION: 'Missing or invalid value for long description',
    POSTAL_CODE: 'Missing or invalid value for postal code',
    MONTHLY_COST: 'Missing or invalid value for monthly cost',
    UTILITIES_INCLUDED: 'Missing or invalid value for utilities included',
    NUM_BEDROOMS: 'Missing or invalid value for number of bedrooms',
    NUM_BATHROOMS: 'Missing or invalid value for number of bathrooms',
    PET_FRIENDLY: 'Missing or invalid value for pet friendly',
    SMOKE_FRIENDLY: 'Missing or invalid value for smoke friendly',
    CONTACT_NAME: 'Missing or invalid value for contact name',
    CONTACT_PHONE_NUMBER: 'Missing or invalid value for contact phone number',
    UNITS_FOR_SALE: 'Missing or invalid value for units for sale',
    UNITS_FOR_RENT: 'Missing or invalid value for units for rent',
    RATES_AND_FEES: 'Missing or invalid value for rates and fees',
    IS_FURNISHED: 'Missing or invalid value for furnished',
    EVENT_DATE_TIME: 'Missing or invalid value for event dates and times'
}

const isValidBusinessListingCategory = category => {
    return includes(Object.values(BUSINESS_CLASSIFIEDS_CATEGORIES), category)
        || includes(Object.values(BUSINESS_SERVICES_CATEGORIES), category);
}

const isValidServiceListingCategory = category => {
    return includes(Object.values(BUSINESS_SERVICES_CATEGORIES), category)
        || includes(Object.values(MEMBER_SERVICE_CATEGORIES), category);
}

const isValidClassifiedCategory = category => {
    return includes(Object.values(BUSINESS_CLASSIFIEDS_CATEGORIES), category);
}

const isValidListingTypeForUser = async (type, uid) => {
    const member = await memberAccounts.findMemberAccountByUid(uid);

    if (member && type !== LISTING_TYPES.SERVICE) {
        return Promise.reject('Members can only create listings in services');
    }
}

const isValidCategoryForUser = async (category, uid) => {
    const member = await memberAccounts.findMemberAccountByUid(uid);

    if (member && !includes(Object.values(MEMBER_SERVICE_CATEGORIES), category)) {
        return Promise.reject(`Members can only create listings in the designated member service categories`);
    } else if (!member && !isValidBusinessListingCategory(category)) {
        return Promise.reject(
            'Businesses can only create listings in designated business service and classified categories'
        );
    }
}

const isValidCategoryForListingType = (category, type) => {
    if ((type === LISTING_TYPES.SERVICE && !isValidServiceListingCategory(category))
        || (type === LISTING_TYPES.CLASSIFIED && !isValidClassifiedCategory(category))) {
        throw new Error(`${category} is not a valid category for ${type} listings`)
    }
    return true;
}

// TODO: write a test for this
const isValidSubcategoryForSelectedCategory = (subcategory, category) => {
    // there are no subcategories for members with home to share
    // get that category's subcategories and make sure that the given subcategory is included in that list
    if ((category === MEMBER_SERVICE_CATEGORIES.MEMBER_HOME && !!subcategory)
        || (!includes(Object.values(LISTING_CATEGORY_SUBCATEGORY_MAP.get(category)), subcategory))) {
        throw new Error(`Subcategory ${subcategory} is not a valid subcategory for category ${category}`);
    }
    return true;
}

const listingShouldHaveCategories = (subcategories, category) => {
    if ((subcategories && subcategories.length) && category === MEMBER_SERVICE_CATEGORIES.MEMBER_HOME) {
        throw new Error(`Listings in ${category} should not have subcategories`);
    } else if ((!subcategories || !subcategories.length) && isValidBusinessListingCategory(category)) {
        throw new Error(`Listings in ${category} must have at least one subcategory`);
    } else {
        return true;
    }
}


module.exports = {
    LISTING_VALIDATION_METHODS,
    LISTING_TYPES,
    CATEGORY_FORM_VALIDATION_DICT,
    LISTING_FIELDS_ERRORS,
    isValidBusinessListingCategory,
    isValidServiceListingCategory,
    isValidClassifiedCategory,
    isValidListingTypeForUser,
    isValidCategoryForUser,
    isValidCategoryForListingType,
    isValidSubcategoryForSelectedCategory,
    listingShouldHaveCategories
}
