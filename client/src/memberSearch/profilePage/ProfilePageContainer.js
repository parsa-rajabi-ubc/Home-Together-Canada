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
import {memberProfileMock, interestedAreasMock, roommatesMock} from "../../accountSummary/member/MockData";
import ProfilePage from "./ProfilePage";
import {getMemberAge} from "../../common/utils/generalUtils";

const ProfilePageContainer = () => {
    let {username} = useParams();
    let profile = find(mockProfiles, {username: username})
    const gender = memberProfileMock.gender;
    const genderDescription = memberProfileMock.genderDescription;

    const age = getMemberAge(memberProfileMock.birthYear);

    const familyStatus = memberProfileMock.status;
    const roommates = roommatesMock;
    let partnerOrGroupMembers = "";
    if ((familyStatus === 'Couple' || familyStatus === 'Couple With Children')) {
        partnerOrGroupMembers = "Partner"
    } else if (familyStatus === 'Existing Group') {
        partnerOrGroupMembers = "Group Members"
    }

    let roommateUsernamesHyperLinks = [];
    roommates.forEach(function (person) {
        roommateUsernamesHyperLinks.push(
            <Link to={`${person}`} key={person}>
                <span className={"hover:underline text-blue-600"}>{person} </span>
            </Link>
        )
    })


    const shareLimit = memberProfileMock.numRoommates;
    const workStatus = memberProfileMock.workStatus;

    const rent = {
        min: memberProfileMock.minMonthlyBudget,
        max: memberProfileMock.maxMonthlyBudget,
    };

    const areasOfInterest = interestedAreasMock;

    let preferredLocations = [];
    areasOfInterest.forEach(function (location) {
        preferredLocations.push(location.city, ", ", location.province, '\n');
    })

    // Check the length of the area of interest and if it has more than 1 entry, add an s to the end of the text
    const prefLocationText = areasOfInterest.length > 1 ? "Preferred Locations" : "Preferred Location";

    const about = memberProfileMock.bio;

    // Yes/No
    const petFriendly = memberProfileMock.petFriendly;
    const petDescription = memberProfileMock.petDescription;

    const smokeFriendly = memberProfileMock.isSmoker;
    const smokingDescription = memberProfileMock.smokingDescription;

    const hasHealthMobilityIssues = memberProfileMock.hasHealthMobilityIssues;
    const healthMobilityIssuesDescription = memberProfileMock.healthMobilityIssuesDescription;

    const hasAllergies = memberProfileMock.hasAllergies;
    const allergiesDescription = memberProfileMock.allergiesDescription;

    const isReligionImportant = memberProfileMock.isReligionImportant;
    const religionDescription = memberProfileMock.religionDescription;

    const isDietImportant = memberProfileMock.isDietImportant;
    const dietDescription = memberProfileMock.dietDescription;

    const hasHomeToShare = memberProfileMock.hasHomeToShare;
    const hasHomeToShareDescription = memberProfileMock.hasHomeToShareDescription;

    const interestInBuyingHome = memberProfileMock.interestInBuyingHome;
    const interestDescription = memberProfileMock.interestDescription;

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