import React from 'react';
import renderer from  'react-test-renderer'
import SubmitButton from "../SubmitButton";
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.13
 *
 * @Description: Submit Button Component Snapshot test
 *
 */
describe('SubmitButton', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<SubmitButton label="testLabelString1" />).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})