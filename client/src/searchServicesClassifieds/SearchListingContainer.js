/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Search Listing Container
 *
 */

import React, {createContext, useState, useCallback} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SearchListingFiltersContainer from "./searchFilter/SearchListingFiltersContainer";
import ListingResultsContainer from "./listingResults/ListingResultsContainer";
import {resolveCategoryToListingType} from "../common/utils/listingsUtils";
import * as ListingService from "../services/ListingService";
import {getConcatenatedErrorMessage} from "../registration/registrationUtils";
import Loading from "../common/loading/Loading";
import Confirmation from "../common/listings/Confirmation";
import {MEMBER_SERVICE_CATEGORIES} from "../createListing/constants/serviceListingCategoriesText";
import {USER_TYPES} from "../common/constants/users";
import {
    setServiceListingsSearchResults,
    setClassifiedListingsSearchResults,
    setServiceListingsSearchFilters,
    setClassifiedListingsSearchFilters
} from "../redux/slices/listing";
import {getInitialListingUserType} from "./searchListingUtils";

export const listingContext = createContext();

export const PAGE_NAMES = {
    SERVICES: "services",
    CLASSIFIEDS: "classifieds",
}

const MESSAGES = {
    CREATE_SEARCH: "Please use filters to search",
    ERROR: "Oops, there was an error loading search results. Please try again",
}

function SearchListingContainer(props) {
    const {
        listingPage,
        serviceListingsSearchResults,
        setServiceListingsSearchResults,
        classifiedListingsSearchResults,
        setClassifiedListingsSearchResults,
        serviceListingsSearchFilters,
        setServiceListingsSearchFilters,
        classifiedListingsSearchFilters,
        setClassifiedListingsSearchFilters
    } = props;

    const [searchFiltersSelected, setSearchFiltersSelected] = useState(
        listingPage === PAGE_NAMES.SERVICES
            ? !!serviceListingsSearchResults
            : !!classifiedListingsSearchResults
    );
    const [listingData, setListingData] = useState(
        listingPage === PAGE_NAMES.SERVICES
            ? (serviceListingsSearchResults || [])
            : (classifiedListingsSearchResults || [])
    );
    const [listingUser, setListingUser] = useState(
        getInitialListingUserType(
            serviceListingsSearchResults,
            classifiedListingsSearchResults,
            serviceListingsSearchFilters
        )
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
                    if (data.listings) {
                        if (searchFilterRequestBody.category === MEMBER_SERVICE_CATEGORIES.MEMBER_HOME) {
                            setListingUser(USER_TYPES.MEMBER);
                        } else {
                            setListingUser(USER_TYPES.BUSINESS);
                        }

                        listingPage === PAGE_NAMES.SERVICES
                            ? setServiceListingsSearchResults({ serviceListingsSearchResults: data.listings })
                            : setClassifiedListingsSearchResults({ classifiedListingsSearchResults: data.listings });

                        setListingData(data.listings);
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

    function updateSearchFilters(newSearchFilters) {
        listingPage === PAGE_NAMES.SERVICES
            ? setServiceListingsSearchFilters({ serviceListingsSearchFilters: {...newSearchFilters} })
            : setClassifiedListingsSearchFilters({ classifiedListingsSearchFilters: {...newSearchFilters} })
    }

    const showAppropriateResultsPanel = useCallback(() => {
        if (loading) {
            return <Loading isLoading={loading}/>
        } else if (!searchFiltersSelected) {
            return <Confirmation message={MESSAGES.CREATE_SEARCH} displayButton={false}/>
        } else if (error) {
            return <Confirmation message={MESSAGES.ERROR} displayButton={false} errorColor={true}/>
        } else {
            return <ListingResultsContainer listingUser={listingUser} listingData={listingData}/>
        }
    }, [loading, searchFiltersSelected, error]);

    return (
        <listingContext.Provider value={listingPage}>
            <div className={"flex"}>
                <div className={"flex-none w-1/3"}>
                    <SearchListingFiltersContainer
                        onSearch={onSearch}
                        searchFilters={
                            listingPage === PAGE_NAMES.SERVICES
                                ? serviceListingsSearchFilters
                                : classifiedListingsSearchFilters
                        }
                        setSearchFilters={updateSearchFilters}
                    />
                </div>
                <div className={"flex-1"}>
                    {showAppropriateResultsPanel()}
                </div>
            </div>
        </listingContext.Provider>
    );
}

SearchListingContainer.propTypes = {
    listingPage: PropTypes.string.isRequired,
    serviceListingsSearchResults: PropTypes.array,
    setServiceListingsSearchResults: PropTypes.func.isRequired,
    classifiedListingsSearchResults: PropTypes.array,
    setClassifiedListingsSearchResults: PropTypes.func.isRequired,
    serviceListingsSearchFilters: PropTypes.shape({
        searchArea: PropTypes.shape({
            province: PropTypes.string,
            city: PropTypes.string,
            radius: PropTypes.number
        }),
        category: PropTypes.string,
        subcategories: PropTypes.array
    }),
    setServiceListingsSearchFilters: PropTypes.func.isRequired,
    classifiedListingsSearchFilters: PropTypes.shape({
        searchArea: PropTypes.shape({
            province: PropTypes.string,
            city: PropTypes.string,
            radius: PropTypes.number
        }),
        category: PropTypes.string,
        subcategories: PropTypes.array
    }),
    setClassifiedListingsSearchFilters: PropTypes.func.isRequired
}

const mapDispatchToProps = {
    setServiceListingsSearchResults,
    setClassifiedListingsSearchResults,
    setServiceListingsSearchFilters,
    setClassifiedListingsSearchFilters
}

const mapStateToProps = state => ({
    serviceListingsSearchResults: state.listings.serviceListingsSearchResults,
    classifiedListingsSearchResults: state.listings.classifiedListingsSearchResults,
    serviceListingsSearchFilters: state.listings.serviceListingsSearchFilters,
    classifiedListingsSearchFilters: state.listings.classifiedListingsSearchFilters
});

export default connect(mapStateToProps, mapDispatchToProps) (SearchListingContainer);
