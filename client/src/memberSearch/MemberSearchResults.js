/**
 * @Author:     Jeff Hatton
 * @Created:    2021.1.23
 *
 * @Description: returns stateless functional component as array of profile cards
 * - previously filtered set of results by parent component - this creates the profile cards;
 *
 */

// returns all member search results
import React from 'react';
import ProfileCard from "./ProfileCard";
import PropTypes from "prop-types";

function MemberSearchResults(props){
    const {ProfileData} = props;
    const profiles = [];
    for (let i = 0; i < ProfileData.length; i++) {
        profiles.push(<ProfileCard key={i}
                                   username={ProfileData[i].username}
                                   age={ProfileData[i].age}
                                   familyStatus={ProfileData[i].status}
                                   minBudget={ProfileData[i].minRent}
                                   maxBudget={ProfileData[i].maxRent}
                                   pet={ProfileData[i].pet}
                                   smoke={ProfileData[i].smoke}
                                   religion={ProfileData[i].religion}
                                   diet={ProfileData[i].diet}
        />);
    }
    return (
        <div>
            {profiles}
        </div>
    );
}

MemberSearchResults.propTypes = {
    ProfileData: PropTypes.array
};

export default MemberSearchResults;