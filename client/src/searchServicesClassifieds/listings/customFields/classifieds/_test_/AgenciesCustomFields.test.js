/**
 * @Author:     Alex Qin
 * @Created:    2021.02.21
 *
 * @Description: AgenciesCustomFields snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import {agenciesMockCustomFields} from "../../../../../mockData/MockClassifiedsCustomFields";
import AgenciesCustomFields from "../AgenciesCustomFields";

describe('AgenciesCustomFields', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            ...agenciesMockCustomFields,
        };
        //when
        const component = renderer.create(<AgenciesCustomFields {...props}/>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});