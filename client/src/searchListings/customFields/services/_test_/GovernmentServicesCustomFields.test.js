/**
 * @Author:     Alex Qin
 * @Created:    2020.01.14
 *
 * @Description: GovernmentServicesCustomFields snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import {BrowserRouter as Router} from "react-router-dom";
import {Governmental} from "../MockServices";
import GovernmentServicesCustomFields from "../GovernmentServicesCustomFields";

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

describe('GovernmentServicesCustomFields', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const reset = jest.fn();
        const props = {
            ...Governmental,
            reset
        };
        //when
        const component = renderer.create(<Router><GovernmentServicesCustomFields {...props}/></Router>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});