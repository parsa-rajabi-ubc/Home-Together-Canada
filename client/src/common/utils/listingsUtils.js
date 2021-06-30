/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.21
 *
 * @Description: Util functions used for listings
 *
 */

import {
    BUSINESS_SERVICE_CATEGORIES,
    MEMBER_SERVICE_CATEGORIES
} from "../../createListing/constants/serviceListingCategoriesText";
import {BUSINESS_CLASSIFIEDS_CATEGORIES} from "../../createListing/constants/classifiedListingCategoriesText";
import {
    CO_HOUSING_SUBCATEGORIES_LIST, GOVERNMENT_SERVICES_SUBCATEGORIES_LIST, SHARED_BUSINESS_SERVICES_SUBCATEGORIES_LIST,
    SHARED_HOME_SERVICES_SUBCATEGORIES_LIST
} from "../../createListing/constants/serviceListingConstants";
import {
    CLASSES_CLUBS_EVENTS_SUBCATEGORIES_LIST,
    HOUSE_YARD_SERVICES_SUBCATEGORIES_LIST, LEGAL_SALES_AGENCIES_SUBCATEGORIES_LIST,
    RENTALS_SUBCATEGORIES_LIST
} from "../../createListing/constants/classifiedListingConstants";
import includes from 'lodash/includes';

export const LISTING_TYPE = {
    SERVICE: 'service',
    CLASSIFIED: 'classified',
}

export function resolveCategoryToListingType(category) {
    switch (category) {
        case MEMBER_SERVICE_CATEGORIES.MEMBER_HOME:
            return LISTING_TYPE.SERVICE;
        case BUSINESS_SERVICE_CATEGORIES.CO_HOUSING:
            return LISTING_TYPE.SERVICE;
        case BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES:
            return LISTING_TYPE.SERVICE;
        case BUSINESS_SERVICE_CATEGORIES.SHARED_BUSINESS_SERVICES:
            return LISTING_TYPE.SERVICE;
        case BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES:
            return LISTING_TYPE.SERVICE;
        case BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS:
            return LISTING_TYPE.CLASSIFIED;
        case BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD:
            return LISTING_TYPE.CLASSIFIED;
        case BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES:
            return LISTING_TYPE.CLASSIFIED;
        case BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS:
            return LISTING_TYPE.CLASSIFIED;
    }
}

export function getSubcategories(category) {
    switch (category) {
        case BUSINESS_SERVICE_CATEGORIES.CO_HOUSING:
            return CO_HOUSING_SUBCATEGORIES_LIST;
        case BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES:
            return SHARED_HOME_SERVICES_SUBCATEGORIES_LIST;
        case BUSINESS_SERVICE_CATEGORIES.SHARED_BUSINESS_SERVICES:
            return SHARED_BUSINESS_SERVICES_SUBCATEGORIES_LIST;
        case BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES:
            return GOVERNMENT_SERVICES_SUBCATEGORIES_LIST;
        case BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS:
            return RENTALS_SUBCATEGORIES_LIST;
        case BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD:
            return HOUSE_YARD_SERVICES_SUBCATEGORIES_LIST;
        case BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES:
            return LEGAL_SALES_AGENCIES_SUBCATEGORIES_LIST;
        case BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS:
            return CLASSES_CLUBS_EVENTS_SUBCATEGORIES_LIST;
    }
}

export function isMemberListing(category) {
    return includes(Object.values(MEMBER_SERVICE_CATEGORIES), category);
}

export const BUSINESS_FIELDS = [
    'businessCellPhoneNumber',
    'businessName',
    'businessPhoneNumber',
    'email',
    'incorporatedOwnersNames',
    'isIncorporated',
    'isNationWide',
    'logo',
    'mapAddressLine1',
    'mapAddressLine2',
    'mapCity',
    'mapLatitude',
    'mapLongitude',
    'mapPostalCode',
    'mapProvince',
    'uid',
    'updatedAt',
    'username',
    'website'
];
