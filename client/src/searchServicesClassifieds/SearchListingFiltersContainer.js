/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Search Listing Filter Container
 *
 */

import React, {useContext} from 'react';
import {listingContext} from "./SearchListingContainer";
import ListingResultsContainer from "./listingResults/ListingResultsContainer";

function SearchListingFiltersContainer() {

    const listingPage = useContext(listingContext);

    return (
            <div>

            </div>
    );
}


export default SearchListingFiltersContainer;
