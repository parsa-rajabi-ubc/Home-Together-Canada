/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.02.03
 *
 * @Description: Constants for Listing Forms
 *
 */

import {MEMBER_SERVICE_CATEGORIES, BUSINESS_SERVICE_CATEGORIES} from "../../../constants/serviceListingCategoriesText";

export const MEMBER_HOME_SHARE_TEXT = {
    form_title: MEMBER_SERVICE_CATEGORIES.MEMBER_HOME,
    title: "Descriptive Title",
    postal_code: "Postal Code",
    short_des: "Short Description",
    full_des: "Full Description",
    monthly_cost: "Home share monthly cost (CAD)",
    util_included: "Utilities included?",
    num_bed: "Number of bedrooms",
    num_bath: "Number of bathrooms",
    pet: "Pet friendly?",
    smoking: "Smoke friendly?",
    photos: "Photos"
}
export const CO_HOUSING_TEXT = {
    form_title: BUSINESS_SERVICE_CATEGORIES.CO_HOUSING,
    title: "Descriptive Title",
    contact_name: "Contact Name",
    short_des: "Short Description",
    full_des: "Full Description",
    units_for_sale: "Number of Units for Sale",
    units_for_rent: "Number of Units for Rent",
}
export const HOME_SERVICE_BUSINESS_TEXT = {
    form_title: "Home Sharing Businesses, Groups and Organizations",
    title: "Descriptive Title",
    short_des: "Short Description",
    photos: "Pictures (max of 6)",
    full_des: "Full Description",
    rates_and_fees: "Rates and fees"
}
export const GOVERNMENT_SERVICES_TEXT = {
    form_title: "Government & Human Service Agencies Offering Shared Living & Support Services",
    title: "Descriptive Ad Title",
    short_des: "Short Description",
    full_des: "Full Description"
}