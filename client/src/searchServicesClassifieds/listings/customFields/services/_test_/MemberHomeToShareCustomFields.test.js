/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: MemberHomeToShareCustomFields snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import {BrowserRouter as Router} from "react-router-dom";
import {Member} from "../../../../../mockData/MockServicesCustomFields";
import MemberHomeToShareCustomFields from "../MemberHomeToShareCustomFields";

describe('MemberHomeToShareCustomFields', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            ...Member,
        };
        //when
        const component = renderer.create(<Router><MemberHomeToShareCustomFields {...props}/></Router>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});