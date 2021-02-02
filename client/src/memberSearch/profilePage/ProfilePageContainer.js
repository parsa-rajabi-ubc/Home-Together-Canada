/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.1
 *
 * @Description: Profile Page Container;
 *
 */
import React from 'react';
import {Link, useParams} from "react-router-dom";
import find from "lodash/find";
import mockProfiles from "../../mockData/MockProfileCardData";
import get from "lodash/get";
import memberAccountInfo from "../../accountSummary/member/MockData";
import ProfilePage from "./ProfilePage";
import {getMemberAge} from "../../common/utils/generalUtils";

const ProfilePageContainer = () => {
    let {username} = useParams();
    let profile = find(mockProfiles, {username: username})
    const gender = get(memberAccountInfo, 'gender', "");
    const genderDescription = get(memberAccountInfo, 'genderDescription', "");

    const age = getMemberAge(get(memberAccountInfo, 'birthYear', ""));

    const familyStatus = get(memberAccountInfo, 'selectedFamilyStatus', "");
    const roommates = get(memberAccountInfo, 'roommates', "");
    let partnerOrGroupMembers = "";
    if ((familyStatus === 'Couple' || familyStatus === 'Couple With Children')) {
        partnerOrGroupMembers = "Partner"
    } else if (familyStatus === 'Existing Group') {
        partnerOrGroupMembers = "Group"
    }

    let roommateUsernamesHyperLinks = [];
    roommates.forEach(function (person) {
        roommateUsernamesHyperLinks.push(
            <Link to={`${person}`} key={person}>
                <span className={"hover:underline text-blue-600"}>{person} </span>
            </Link>
        )
    })


    const shareLimit = get(memberAccountInfo, 'selectedLimit', "");
    const workStatus = get(memberAccountInfo, 'selectedWorkStatus', "");

    const rent = {
        min: get(memberAccountInfo, 'minRent', ""),
        max: get(memberAccountInfo, 'maxRent', ""),
    };

    const areasOfInterest = get(memberAccountInfo, 'areasOfInterest', [{
        province: "",
        city: "",
        radius: ""
    }]);

    let preferredLocations = [];
    areasOfInterest.forEach(function (location) {
        preferredLocations.push(location.city, ", ", location.province, '\n');
    })

    // Check the length of the area of interest and if it has more than 1 entry, add an s to the end of the text
    const prefLocationText = areasOfInterest.length > 1 ? "Preferred Locations" : "Preferred Location";

    const about = get(memberAccountInfo, 'aboutSelf', "");

    // Yes/No
    const petFriendly = get(memberAccountInfo, 'petFriendly', "");
    const petDescription = get(memberAccountInfo, 'petDescription', "");

    const smokeFriendly = get(memberAccountInfo, 'smoking', "");
    const smokingDescription = get(memberAccountInfo, 'smokingDescription', "");

    const hasHealthMobilityIssues = get(memberAccountInfo, 'hasHealthMobilityIssues', "");
    const healthMobilityIssuesDescription = get(memberAccountInfo, 'healthMobilityIssuesDescription', "");

    const hasAllergies = get(memberAccountInfo, 'hasAllergies', "");
    const allergiesDescription = get(memberAccountInfo, 'allergiesDescription', "");

    const isReligionImportant = get(memberAccountInfo, 'isReligionImportant', "");
    const religionDescription = get(memberAccountInfo, 'religionDescription', "");

    const isDietImportant = get(memberAccountInfo, 'isDietImportant', "");
    const dietDescription = get(memberAccountInfo, 'dietDescription', "");

    const hasHomeToShare = get(memberAccountInfo, 'hasHomeToShare', "");
    const hasHomeToShareDescription = get(memberAccountInfo, 'hasHomeToShareDescription', "");

    const interestInBuyingHome = get(memberAccountInfo, 'interestInBuyingHome', "");
    const interestDescription = get(memberAccountInfo, 'interestDescription', "");

    return (
        <div>
            <ProfilePage username={profile.username} age={age} gender={gender} genderDescription={genderDescription}
                         shareLimit={shareLimit} workStatus={workStatus} familyStatus={familyStatus}
                         roommates={roommates} partnerOrGroupMembers={partnerOrGroupMembers}
                         roommateUsernames={roommateUsernamesHyperLinks} minRent={rent.min.toString()} maxRent={rent.max.toString()}
                         prefLocationText={prefLocationText} preferredLocations={preferredLocations} about={about}
                         petFriendly={petFriendly} petDescription={petDescription}
                         smokeFriendly={smokeFriendly} smokingDescription={smokingDescription}
                         hasHealthMobilityIssues={hasHealthMobilityIssues}
                         healthMobilityIssuesDescription={healthMobilityIssuesDescription} hasAllergies={hasAllergies}
                         allergiesDescription={allergiesDescription}
                         isReligionImportant={isReligionImportant} religionDescription={religionDescription}
                         isDietImportant={isDietImportant} dietDescription={dietDescription}
                         hasHomeToShare={hasHomeToShare} hasHomeToShareDescription={hasHomeToShareDescription}
                         interestInBuyingHome={interestInBuyingHome} interestDescription={interestDescription}/>
        </div>
    )
}

export default ProfilePageContainer;