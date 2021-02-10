/**
 * @Author:     Jeff Hatton
 * @Created:    2021.1.23
 *
 * @Description: Returns filtered member search results component as a filtered set of member profile cards;
 *
 */

import React, {useState} from "react";
import MemberSearchResults from "./MemberSearchResults";
import NoResultsFound from "./NoResultsFound";
import PropTypes from "prop-types";
import {limitResults} from "./MemberSearchUtils";

const NUM_RESULTS = 7;
const START_INDEX = 0;

function SearchResultsContainer(props) {
    const {profileData} = props;

    const [filteredResults, setFilteredResults] = useState(profileData.length && profileData.length >= NUM_RESULTS
        ? limitResults(profileData, NUM_RESULTS, START_INDEX)
        : limitResults(profileData, profileData.length, NUM_RESULTS));

    return (
        <div className={"m-6"}>
            <h1 className={"text-3xl font-medium m-5"}> Members </h1>

            {/*check for an empty list*/}
            {(!filteredResults.length) ? <NoResultsFound/> : <MemberSearchResults profileData={profileData}/>}


        </div>
    );
}

SearchResultsContainer.propTypes = {
    profileData: PropTypes.array.isRequired
};

export default SearchResultsContainer;