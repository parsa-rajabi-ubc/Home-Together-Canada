/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: GovernmentServicesCustomFields snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import {BrowserRouter as Router} from "react-router-dom";
import {Governmental} from "../../../../../mockData/MockServicesCustomFields";
import GovernmentServicesCustomFields from "../GovernmentServicesCustomFields";

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