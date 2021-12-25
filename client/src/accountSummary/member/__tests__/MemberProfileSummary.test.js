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

jest.mock("uuid", () => ({
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

const reset = jest.fn();

describe('MemberProfileSummary', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            profile: {...memberProfileMock},
            areasOfInterestList: interestedAreasMock,
            roommates: roommatesMock,
            reset
        };
        //when
        const component = renderer.create(<Router><MemberProfileSummary {...props}/></Router>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});
