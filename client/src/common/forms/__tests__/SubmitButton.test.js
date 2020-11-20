/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.13
 *
 * @Description: Submit Button Component Snapshot test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import SubmitButton from "../SubmitButton";

describe('SubmitButton', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // then
            const label = 'testLabelString1';
            const onClickMock = jest.fn();
            const className = 'testClassNameString';
            const inputValue = 'Submit';

            // when
            const component = renderer.create(<SubmitButton className={className} label={label} inputValue={inputValue} onClick={onClickMock} />).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})