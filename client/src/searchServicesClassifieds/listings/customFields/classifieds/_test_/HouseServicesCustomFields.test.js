/**
 * @Author:     Alex Qin
 * @Created:    2021.02.21
 *
 * @Description: HouseServicesCustomFields snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import {houseServicesMockCustomFields} from "../../../../../mockData/MockClassifiedsCustomFields";
import HouseServicesCustomFields from "../HouseServicesCustomFields";

describe('HouseServicesCustomFields', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            ...houseServicesMockCustomFields,
        };
        //when
        const component = renderer.create(<HouseServicesCustomFields {...props}/>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});