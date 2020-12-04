/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.19
 *
 * @Description: radio button input fields Component Snapshot test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import RadioButton from "../RadioButton";

describe('RadioButton', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const label = 'testLabelString1';
            const name = 'testLabelString2';
            const value = 'testValue';
            const placeholder = 'testLabelString3';
            const onChangeMock = jest.fn();

            //when
            const component = renderer.create(<RadioButton label={label} name={name} value={value} placeholder={placeholder} onChange={onChangeMock} />).toJSON();

            //then
            expect(component).toMatchSnapshot();
        });
    })
})