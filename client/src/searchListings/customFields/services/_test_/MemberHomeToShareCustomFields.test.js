/**
 * @Author:     Alex Qin
 * @Created:    2020.01.14
 *
 * @Description: MemberHomeToShareCustomFields snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import {BrowserRouter as Router} from "react-router-dom";
import {Member} from "../MockServices";
import MemberHomeToShareCustomFields from "../MemberHomeToShareCustomFields";

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

describe('MemberHomeToShareCustomFields', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const reset = jest.fn();
        const props = {
            ...Member,
            reset
        };
        //when
        const component = renderer.create(<Router><MemberHomeToShareCustomFields {...props}/></Router>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});