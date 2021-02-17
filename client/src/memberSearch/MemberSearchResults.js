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
import Paginate from "../common/forms/Paginate";
import {getMemberAge} from "../common/utils/generalUtils";

const NUM_RESULTS = 7;

function MemberSearchResults(props) {
    const {profileData} = props;
    const profiles = [];
    for (let i = 0; i < profileData.length; i++) {
        profiles.push(
            <Link to={`/members/${profileData[i].username}`} key={i}>
                <ProfileCard key={i}
                             username={profileData[i].username}
                             age={getMemberAge(profileData[i].birthYear)}
                             familyStatus={profileData[i].status}
                             minBudget={profileData[i].minMonthlyBudget}
                             maxBudget={profileData[i].maxMonthlyBudget}
                             pet={profileData[i].hasPets}
                             smoke={profileData[i].isSmoker}
                             religion={profileData[i].isReligionImportant}
                             diet={profileData[i].isDietImportant}
                             hasHome={profileData[i].hasHomeToShare}
                />
            </Link>
        );
    }
    return (
        <div>
            <Paginate data={profiles} resultsPerPage={NUM_RESULTS}/>
        </div>
    );
}

MemberSearchResults.propTypes = {
    profileData: PropTypes.array.isRequired
};

export default MemberSearchResults;
