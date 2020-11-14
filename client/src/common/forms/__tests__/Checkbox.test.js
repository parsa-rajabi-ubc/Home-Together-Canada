import React from 'react';
import renderer from  'react-test-renderer'
import Checkbox from "../Checkbox";
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.13
 *
 * @Description: Checkbox Component Snapshot test
 *
 */
describe('Checkbox', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<Checkbox label="testLabelString1" onchange={onchange} />).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})