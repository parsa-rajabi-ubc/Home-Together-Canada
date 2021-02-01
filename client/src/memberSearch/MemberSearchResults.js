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
import {Link} from "react-router-dom";

function MemberSearchResults(props) {
    const {profileData} = props;
    const profiles = [];
    for (let i = 0; i < profileData.length; i++) {
        profiles.push(
            <Link to={`/members/${profileData[i].username}`} key={i}>
                <ProfileCard key={i}
                             username={profileData[i].username}
                             age={profileData[i].age}
                             familyStatus={profileData[i].status}
                             minBudget={profileData[i].minRent}
                             maxBudget={profileData[i].maxRent}
                             pet={profileData[i].pet}
                             smoke={profileData[i].smoke}
                             religion={profileData[i].religion}
                             diet={profileData[i].diet}
                />
            </Link>
        );
    }
    return (
        <div>
            {profiles}
        </div>
    );
}

MemberSearchResults.propTypes = {
    profileData: PropTypes.array.isRequired
};

export default MemberSearchResults;