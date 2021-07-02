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

