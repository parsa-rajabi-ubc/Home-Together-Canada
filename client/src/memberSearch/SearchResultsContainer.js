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
import {LimitResults} from "./memberSearchUtils/LimitResults";

function SearchResultsContainer(props) {
    const {ProfileData} = props;
    const [filteredResults,setFilteredResults] = useState([]);
    const numOfResults = 5;

    {/*Currently displays 5 result to mimic filtering*/}
    if (ProfileData!==undefined && ProfileData.length>0 && filteredResults.length < numOfResults && filteredResults.length < ProfileData.length) {
        (ProfileData.length>=numOfResults)
            ? setFilteredResults(LimitResults(ProfileData,numOfResults))
            : setFilteredResults(LimitResults(ProfileData,ProfileData.length))
    }

    return (
        <div>
            {(filteredResults.length<1)
                //check for an empty list
                ? <NoResultsFound/>
                : <MemberSearchResults ProfileData={filteredResults}/>
            }
        </div>
    );
}

SearchResultsContainer.propTypes = {
    ProfileData: PropTypes.array
};

export default SearchResultsContainer;