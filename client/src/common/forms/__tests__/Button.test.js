import React from 'react';
import renderer from  'react-test-renderer'
import Button from "../Button";
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.13
 *
 * @Description: Button Component Snapshot test
 *
 */
describe('Button', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<Button label="testLabelString1" value="testValueString2"/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})