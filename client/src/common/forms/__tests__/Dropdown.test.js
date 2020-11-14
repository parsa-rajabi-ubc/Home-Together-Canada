import React from 'react';
import renderer from  'react-test-renderer'
import Dropdown from "../Dropdown";
import provinces from "../Provinces";
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.13
 *
 * @Description: Dropdown Component Snapshot test
 *
 */
describe('Dropdown', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<Dropdown title="testTitleString1" items={provinces}/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})