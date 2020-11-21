/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.13
 *
 * @Description: Checkbox Component Snapshot test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import Checkbox from "../Checkbox";

describe('Checkbox', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<Checkbox label="testLabelString1" onchange={onchange} checked={true} />).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})