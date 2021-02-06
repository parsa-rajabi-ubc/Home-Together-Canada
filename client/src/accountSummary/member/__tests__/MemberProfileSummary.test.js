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
import {interestedAreasMock, memberProfileMock, roommatesMock} from "../MockData";
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

const setAccountType = jest.fn();
const setAuthenticated = jest.fn();

describe('MemberProfileSummary', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            profile: {...memberProfileMock},
            areasOfInterestList: interestedAreasMock,
            roommates: roommatesMock,
            setAccountType,
            setAuthenticated,
            setIsAdmin: false
        };
        //when
        const component = renderer.create(<Router><MemberProfileSummary {...props}/></Router>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});
