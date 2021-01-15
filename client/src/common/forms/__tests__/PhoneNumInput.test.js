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
            // given
            const label = 'testLabelString1';
            const onChangeMock = jest.fn();
            const providedValue = {
                first: "123",
                middle: "456",
                last: "9999"
            }

            //when
            const component = renderer.create(<PhoneNumInput label={label} value={providedValue} onChange={onChangeMock} maxLength={"3"}/>).toJSON();

            //then
            expect(component).toMatchSnapshot();
        });
    })
})