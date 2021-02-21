/**
 * @Author:     Alex Qin
 * @Created:    2020.01.14
 *
 * @Description: CohousingCustomFields snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import {BrowserRouter as Router} from "react-router-dom";
import {Cohousing} from "../../../../mockData/MockServicesCustomFields";
import CohousingCustomFields from "../CohousingCustomFields";

describe('CohousingCustomFields', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const reset = jest.fn();
        const props = {
            ...Cohousing,
            reset
        };
        //when
        const component = renderer.create(<Router><CohousingCustomFields {...props}/></Router>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});