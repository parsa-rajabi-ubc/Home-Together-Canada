/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.03.07
 *
 * @Description: component for search service listings
 *
 */

import React from 'react';
import SearchListingContainer, {PAGE_NAMES} from "./SearchListingContainer";

const SearchServiceListings = () => {
    return <SearchListingContainer listingPage={PAGE_NAMES.SERVICES}/>
}

export default SearchServiceListings;
