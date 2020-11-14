import React from 'react';
import renderer from  'react-test-renderer'
import Address from "../Address";
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.13
 *
 * @Description: Address Component Snapshot test
 *
 */
describe('Address', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<Address label="testLabelString1" />).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})