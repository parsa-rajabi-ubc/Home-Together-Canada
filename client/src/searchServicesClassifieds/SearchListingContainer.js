/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Search Listing Container
 *
 */

import React, {useState, createContext, useEffect} from 'react';
import SearchListingFiltersContainer from "./searchFilter/SearchListingFiltersContainer";
import {useHistory} from "react-router-dom";
import ListingResultsContainer from "./listingResults/ListingResultsContainer";

export const listingContext = createContext();

export const PAGE_NAMES = {
    SERVICES: "services",
    CLASSIFIEDS: "classifieds",
}

function SearchListingContainer() {

    let URL_PATH = useHistory().location.pathname;
    const [listingPage, setListingPage] = useState();

    useEffect(() => {
        (URL_PATH === "/" + PAGE_NAMES.SERVICES ? setListingPage(PAGE_NAMES.SERVICES) : setListingPage(PAGE_NAMES.CLASSIFIEDS));
    }, [URL_PATH]);

    return (
        <listingContext.Provider value={listingPage}>
            <div className={"flex"}>
                <div className={"flex-none w-1/3"}>
                    <SearchListingFiltersContainer/>
                </div>
                <div className={"flex-1"}>
                    <ListingResultsContainer/>
                </div>
            </div>
        </listingContext.Provider>
    );
}

export default SearchListingContainer;
