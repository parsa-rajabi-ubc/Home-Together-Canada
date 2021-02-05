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
import MemberSearchControls from "./MemberSearchControls";

const DEFAULT_NUM_RESULTS = 5;
const START_INDEX = 0;

function SearchResultsContainer(props) {
    const {profileData} = props;
    const [numResults, setNumResults] = useState(DEFAULT_NUM_RESULTS);
    const [startIndex, setStartIndex] = useState(START_INDEX)
    //I left this as a state variable since it will inevitably be needed as one
    const [filteredResults, setFilteredResults] = useState(profileData.length && profileData.length >= numResults
        ? limitResults(profileData, numResults, startIndex)
        : limitResults(profileData, profileData.length, startIndex));
    useEffect(() => {
        setFilteredResults(
            profileData.length && profileData.length >= numResults
                ? limitResults(profileData, numResults, startIndex)
                : limitResults(profileData, profileData.length, startIndex)
        )
    }, [profileData, numResults, startIndex]);
    return (
        <div>
            {/*check for an empty list*/}
            {(!filteredResults.length) ? <NoResultsFound/>
                : <MemberSearchResults profileData={filteredResults}/>
            }
            <MemberSearchControls currentFirstResult={startIndex} currentNumResults={numResults}
                                  numOfResultsAvailable={profileData.length} onChangeNumResults={setNumResults}
                                  onChangeStartIndex={setStartIndex}/>
        </div>
    );
}

SearchResultsContainer.propTypes = {
    profileData: PropTypes.array.isRequired
};

export default SearchResultsContainer;