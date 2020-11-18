/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.13
 *
 * @Description: Phone number input fields Component Snapshot test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import PhoneNumInput from "../PhoneNumInput";

describe('PhoneNumInput', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<PhoneNumInput label="testLabelString1" />).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})