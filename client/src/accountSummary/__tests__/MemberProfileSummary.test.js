/**
 * @Author:     Jeff Hatton
 * @Created:    2020.01.14
 *
 * @Description: Member Profile Summary form Component snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import {BrowserRouter as Router} from "react-router-dom";
import MemberProfileSummary from "../MemberProfileSummary";

jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

const history = {
    //account
    firstName: "mockFN",
    lastName: "mockLN",
    yearOfBirth: 1984,
    email: "mock@email.com",
    phoneNumber: {
        first: "123",
        middle: "456",
        last: "9999"
    },
    useDifferentMailingAddress: false,
    address: {
        street: "123 45 street",
        aptNum: "",
        city: "Kelowna",
        province: "BC",
        postalCode: "Y4K 2N5"
    },
    mailingAddress: {
        street: "123 45 street",
        aptNum: "",
        city: "Kelowna",
        province: "BC",
        postalCode: "Y4K 2N5"
    },

    //profile
    gender: "Female",
    genderDescription: "",
    petFriendly: "yes",
    petDescription: "have dogs",
    smoking: "yes",
    smokingDescription: "tobacco only",
    mobilityIssues: "no",
    mobilityIssuesDescription: "",
    hasAllergies: "yes",
    allergiesDescription: "peanuts",
    religious: "yes",
    religionDescription: "Roman Catholic",
    hasDiet: "no",
    dietDescription: "",
    hasHome: "no",
    homeDescription: "",
    interestInBuyingHome: "false",
    interestDescription: "",
    minRent: "800",
    maxRent: "1700",
    aboutSelf: "I like to type as little as possible",
    selectedLimit: 3,
    selectedFamilyStatus: "Couple",
    selectedWorkStatus: "Retired",
    partner: "John123",
    groupMembers: "",
    areasOfInterest: [{
        province: "AB",
        city: "Edmonton",
        radius: "50km"
    }]
}

    describe('MemberProfileSummary', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                history
            };
            //when
            const component = renderer.create(<Router><MemberProfileSummary {...props}/></Router>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
