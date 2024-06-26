/**
 * @Author:     Jeff Hatton
 * @Created:    2020.01.14
 *
 * @Description: Member Account Summary form Component snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import {BrowserRouter as Router} from "react-router-dom";
import memberAccountInfo, {memberAccountMock} from "../MockData";
import MemberAccountSummary from "../MemberAccountSummary";

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

describe('MemberAccountSummary', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            member: memberAccountMock,
            reset
        };
        //when
        const component = renderer.create(<Router><MemberAccountSummary {...props}/></Router>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});
