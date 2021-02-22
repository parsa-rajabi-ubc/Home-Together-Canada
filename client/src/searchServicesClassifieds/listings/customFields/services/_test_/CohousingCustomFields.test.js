/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: CohousingCustomFields snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import {BrowserRouter as Router} from "react-router-dom";
import {cohousingMockCustomFields} from "../../../../../mockData/MockServicesCustomFields";
import CohousingCustomFields from "../CohousingCustomFields";

describe('CohousingCustomFields', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            ...cohousingMockCustomFields,
        };
        //when
        const component = renderer.create(<Router><CohousingCustomFields {...props}/></Router>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});