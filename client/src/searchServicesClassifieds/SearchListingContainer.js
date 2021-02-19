/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Search Listing Container
 *
 */

import React, {useState, createContext, useEffect} from 'react';
import SearchListingFiltersContainer from "./searchFilter/SearchListingFiltersContainer";
import {useParams} from "react-router-dom";
import ListingResultsContainer from "./listingResults/ListingResultsContainer";

export const listingContext = createContext();

const PAGE_NAMES = {
    SERVICES: "services",
    CLASSIFIEDS: "classifieds",
}

function SearchListingContainer() {

    let {servicesClassifieds} = useParams();
    const [listingPage, setListingPage] = useState();

    useEffect(() => {
        (servicesClassifieds === PAGE_NAMES.SERVICES ? setListingPage(PAGE_NAMES.SERVICES) : setListingPage(PAGE_NAMES.CLASSIFIEDS));
    }, [servicesClassifieds]);

    return (
        <listingContext.Provider value={listingPage}>
            <SearchListingFiltersContainer/>
            <ListingResultsContainer/>
        </listingContext.Provider>
    );
}

export default SearchListingContainer;
