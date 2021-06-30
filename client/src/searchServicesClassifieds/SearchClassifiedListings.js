/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.03.07
 *
 * @Description: component for search classified listings
 *
 */

import React from 'react';
import SearchListingContainer, {PAGE_NAMES} from "./SearchListingContainer";

const SearchClassifiedListings = () => {
    return <SearchListingContainer listingPage={PAGE_NAMES.CLASSIFIEDS}/>
}

export default SearchClassifiedListings;
