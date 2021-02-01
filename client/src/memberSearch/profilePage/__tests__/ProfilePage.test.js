/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.22
 *
 * @Description: Test for profile page
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import ProfilePage from "../ProfilePage";

describe('ProfilePage', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                username: "Babar",
                age: 40,

                gender: "Male",
                genderDescription: "",

                shareLimit: 2,

                workStatus: "Student",
                familyStatus: "Existing Group",

                roommates: ["jack", "potato"],
                partnerOrGroupMembers: "Group: ",
                roommateUsernames: ["jack", "potato"],

                minRent: "400",
                maxRent: "890",

                prefLocationText: "Preferred Locations",
                preferredLocations: ["Calgary, AB", "Kelowna, BC"],

                about: "Sushi is a great food!",

                petFriendly: true,
                petDescription: "",

                smokeFriendly: true,
                smokingDescription: "",

                hasHealthMobilityIssues: true,
                healthMobilityIssuesDescription: "",

                hasAllergies: true,
                allergiesDescription: "",

                isReligionImportant: true,
                religionDescription: "",

                isDietImportant: true,
                dietDescription: "",

                hasHomeToShare: true,
                hasHomeToShareDescription: "",

                interestInBuyingHome: true,
                interestDescription: "",
            };
            //when
            const component = renderer.create(<ProfilePage {...props}/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})