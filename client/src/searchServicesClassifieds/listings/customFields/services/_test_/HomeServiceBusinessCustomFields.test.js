/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: HomeServiceBusinessCustomFields snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import {BrowserRouter as Router} from "react-router-dom";
import {Facilitation} from "../../../../../mockData/MockServicesCustomFields";
import HomeServiceBusinessCustomFields from "../HomeServiceBusinessCustomFields";

describe('GovernmentServicesCustomFields', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const reset = jest.fn();
        const props = {
            ...Facilitation,
            reset
        };
        //when
        const component = renderer.create(<Router><HomeServiceBusinessCustomFields {...props}/></Router>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});