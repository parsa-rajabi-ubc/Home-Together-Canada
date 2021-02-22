/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: MemberHomeToShareCustomFields snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import {Member} from "../../../../../mockData/MockServicesCustomFields";
import MemberHomeToShareCustomFields from "../MemberHomeToShareCustomFields";

describe('MemberHomeToShareCustomFields', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const reset = jest.fn();
        const props = {
            ...Member,
            reset
        };
        //when
        const component = renderer.create(<MemberHomeToShareCustomFields {...props}/>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});