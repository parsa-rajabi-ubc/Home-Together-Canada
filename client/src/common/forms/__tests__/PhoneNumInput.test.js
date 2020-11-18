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

            //when
            const component = renderer.create(<PhoneNumInput label={label} onChange={onChangeMock} />).toJSON();

            //then
            expect(component).toMatchSnapshot();
        });
    })
})