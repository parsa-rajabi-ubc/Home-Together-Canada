/**
 * @Author:     Jeff Hatton
 * @Created:    2021.1.23
 *
 * @Description: Returns filtered member search results component as a filtered set of member profile cards;
 *
 */

import React, {useState, useEffect} from "react";
import MemberSearchResults from "./MemberSearchResults";
import NoResultsFound from "./NoResultsFound";
import PropTypes from "prop-types";
import {limitResults} from "./MemberSearchUtils";
import SearchListingsControls from "../common/listings/SearchListingsControls";

const DEFAULT_NUM_RESULTS = 5;
const START_INDEX = 0;

function SearchResultsContainer(props) {
    const {profileData} = props;
    const [numResults, setNumResults] = useState(DEFAULT_NUM_RESULTS);
    const [startIndex, setStartIndex] = useState(START_INDEX)
    const [filteredResults, setFilteredResults] = useState(profileData.length && profileData.length >= numResults
        ? limitResults(profileData, numResults, startIndex)
        : limitResults(profileData, profileData.length, startIndex));
    useEffect(() => {
        setFilteredResults(
            profileData.length >= numResults
                ? limitResults(profileData, numResults, startIndex)
                : limitResults(profileData, profileData.length, startIndex)
        )
    }, [profileData, numResults, startIndex]);
    return (
        <div className={"m-6"}>
            <h1 className={"text-3xl font-medium m-5"}> Members </h1>

            {/*check for an empty list*/}
            {(!filteredResults.length) ? <NoResultsFound/> : <MemberSearchResults profileData={filteredResults}/>}

            <SearchListingsControls currentFirstResult={startIndex} currentNumResults={numResults}
                                    totalNumResults={profileData.length} onChangeNumResults={setNumResults}
                                    onChangeStartIndex={setStartIndex}/>
        </div>
    );
}

SearchResultsContainer.propTypes = {
    profileData: PropTypes.array.isRequired
};

export default SearchResultsContainer;