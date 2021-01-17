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
import values from "../MockB";
import BusinessAccountSummary from "../BusinessAccountSummary";

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

describe('MemberAccountSummary', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            values
        };
        //when
        const component = renderer.create(<Router><BusinessAccountSummary {...props}/></Router>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});