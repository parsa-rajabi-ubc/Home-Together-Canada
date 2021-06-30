/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.03.07
 *
 * @Description: helper function for search listings
 *
 */

import {MEMBER_SERVICE_CATEGORIES} from "../createListing/constants/serviceListingCategoriesText";
import {USER_TYPES} from "../common/constants/users";

export const getInitialListingUserType = (serviceListingsSearchResults, classifiedListingsSearchResults, serviceListingsSearchFilters) => {
    if (!!serviceListingsSearchResults && serviceListingsSearchFilters.category === MEMBER_SERVICE_CATEGORIES.MEMBER_HOME) {
        return USER_TYPES.MEMBER;
    } else if (!!serviceListingsSearchResults || !!classifiedListingsSearchResults) {
        return USER_TYPES.BUSINESS;
    } else {
        return '';
    }
}

export const getInitialCategoryFilter = searchFilters => {
    if (!!searchFilters && !!searchFilters.category) {
        return searchFilters.category;
    } else {
        return undefined;
    }
}

export const getInitialSubcategoriesFilter = searchFilters => {
    if (!!searchFilters && !!searchFilters.subcategories) {
        return searchFilters.subcategories;
    } else {
        return [];
    }
}

export const getInitialSearchAreaFilter = searchFilters => {
    if (!!searchFilters && !!searchFilters.searchArea) {
        return searchFilters.searchArea;
    } else {
        return {
            province: '',
            city: '',
            radius: 0,
        }
    }
}
