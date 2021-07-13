/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.02.04
 *
 * @Description: Constants for Listings
 *
 */
import {
    BUSINESS_SERVICE_CATEGORIES,
    MEMBER_SERVICE_CATEGORIES
} from "../../createListing/constants/serviceListingCategoriesText";
import {BUSINESS_CLASSIFIEDS_CATEGORIES} from "../../createListing/constants/classifiedListingCategoriesText";


export const CREATE_LISTINGS_TEXT = "Create Listing"
export const SERVICES_TEXT = "Home Sharing Listings";
export const CLASSIFIEDS_TEXT = "Local Classifieds";

export const SHORT_DESC_CHAR_COUNT = 50;

export const LISTING_CATEGORIES_WITH_IMAGES = [
    MEMBER_SERVICE_CATEGORIES.MEMBER_HOME,
    BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES,
    BUSINESS_SERVICE_CATEGORIES.SHARED_BUSINESS_SERVICES,
    BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS,
    BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD,
    BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES,
    BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS,
]
