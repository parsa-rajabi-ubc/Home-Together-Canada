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

const NUM_RESULTS = 5;
const START_INDEX = 0;

function SearchResultsContainer(props) {
    const {profileData} = props;

    //I left this as a state variable since it will inevitably be needed as one
    const [filteredResults, setFilteredResults] = useState(
        profileData.length && profileData.length >= NUM_RESULTS ? limitResults(profileData, NUM_RESULTS, START_INDEX) : limitResults(profileData, profileData.length, START_INDEX));

    return (
        <div>
            {/*check for an empty list*/}
            {(!filteredResults.length) ? <NoResultsFound/> : <MemberSearchResults profileData={filteredResults}/>
            }
        </div>
    );
}

SearchResultsContainer.propTypes = {
    profileData: PropTypes.array.isRequired
};

export default SearchResultsContainer;