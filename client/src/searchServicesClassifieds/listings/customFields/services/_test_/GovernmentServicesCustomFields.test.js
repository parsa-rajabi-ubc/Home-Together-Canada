/**
 * @Author:     Alex Qin
 * @Created:    2021.02.17
 *
 * @Description: GovernmentServicesCustomFields snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
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
        const component = renderer.create(<GovernmentServicesCustomFields {...props}/>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});