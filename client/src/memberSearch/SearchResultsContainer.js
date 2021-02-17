/**
 * @Author:     Jeff Hatton
 * @Created:    2021.1.23
 *
 * @Description: Returns filtered member search results component as a filtered set of member profile cards;
 *
 */

import React from "react";
import MemberSearchResults from "./MemberSearchResults";
import NoResultsFound from "./NoResultsFound";
import PropTypes from "prop-types";

function SearchResultsContainer(props) {
    const {profileData} = props;

    return (
        <div className={"m-6"}>
            <h1 className={"text-3xl font-medium m-5"}> Members </h1>

            {/*check for an empty list*/}
            {(!profileData.length) ? <NoResultsFound/> : <MemberSearchResults profileData={profileData}/>}
        </div>
    );
}

SearchResultsContainer.propTypes = {
    profileData: PropTypes.array.isRequired
};

export default SearchResultsContainer;