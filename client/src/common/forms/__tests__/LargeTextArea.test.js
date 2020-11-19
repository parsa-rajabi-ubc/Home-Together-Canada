/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.19
 *
 * @Description: Phone number input fields Component Snapshot test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import LargeTextArea from "../LargeTextArea";

describe('LargeTextArea', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const label = 'testLabelString1';
            const name = 'testLabelString2';
            const placeholder = 'testLabelString3';
            const onChangeMock = jest.fn();

            //when
            const component = renderer.create(<LargeTextArea label={label} name={name} placeholder={placeholder} onChange={onChangeMock} />).toJSON();

            //then
            expect(component).toMatchSnapshot();
        });
    })
})