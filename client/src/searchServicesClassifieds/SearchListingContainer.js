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
import {resolveCategoryToListingType} from "../common/utils/listingsUtils";
import * as ListingService from "../services/ListingService";
import {getConcatenatedErrorMessage} from "../registration/registrationUtils";
import Loading from "../common/loading/Loading";
import Confirmation from "../common/listings/Confirmation";
import {MEMBER_SERVICE_CATEGORIES} from "../createListing/constants/serviceListingCategoriesText";

export const listingContext = createContext();

export const PAGE_NAMES = {
    SERVICES: "services",
    CLASSIFIEDS: "classifieds",
}

const MESSAGES = {
    CREATE_SEARCH: "Please use filters to search",
    ERROR: "Oops, there was an error loading search results. Please try again",
}

function SearchListingContainer() {

    let URL_PATH = useHistory().location.pathname;
    const [listingPage, setListingPage] = useState('');
    const [searchFiltersSelected, setSearchFiltersSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        (URL_PATH === "/" + PAGE_NAMES.SERVICES ? setListingPage(PAGE_NAMES.SERVICES) : setListingPage(PAGE_NAMES.CLASSIFIEDS));
    }, [URL_PATH]);

    const onSearch = (searchFilter) => {
        if (!loading) {
            setLoading(true);
            const searchFilterRequestBody = {
                type: resolveCategoryToListingType(searchFilter.selectedCategory),
                category: searchFilter.selectedCategory,
                ...(searchFilter.selectedCategory === MEMBER_SERVICE_CATEGORIES.MEMBER_HOME)
                    ? {subcategories: []} : {subcategories: searchFilter.selectedSubcategories},
                searchArea: searchFilter.searchArea
            }
            ListingService.searchListings(searchFilterRequestBody)
                .then(res => res.json())
                .then(data => {
                    setSearchFiltersSelected(true);
                    if (data.listing) {
                        setError(false);
                        setLoading(false);
                    } else if (data.err) {
                        alert('Error: ' + data.err);
                        setError(true);
                        setLoading(false);
                    } else if (data.errors) {
                        const errorMessage = getConcatenatedErrorMessage(data.errors);
                        // show list of all errors
                        alert(errorMessage);
                        setError(true);
                        setLoading(false);
                    } else {
                        setError(true);
                        setLoading(false);
                    }
                })
                .catch(err => {
                    alert('Error: ' + err.message);
                    setError(true);
                    setLoading(false);
                });
        }
    }

    function showAppropriateResultsPanel() {
        if (loading) {
            return <Loading isLoading={loading}/>
        } else if (!searchFiltersSelected) {
            return <Confirmation message={MESSAGES.CREATE_SEARCH} displayButton={false}/>
        } else if (error) {
            return <Confirmation message={MESSAGES.ERROR} displayButton={false} errorColor={true}/>
        } else {
            return <ListingResultsContainer/>
        }
    }

    return (
        <listingContext.Provider value={listingPage}>
            <div className={"flex"}>
                <div className={"flex-none w-1/3"}>
                    <SearchListingFiltersContainer onSearch={onSearch}/>
                </div>
                <div className={"flex-1"}>
                    {showAppropriateResultsPanel()}
                </div>
            </div>
        </listingContext.Provider>
    );
}

export default SearchListingContainer;
