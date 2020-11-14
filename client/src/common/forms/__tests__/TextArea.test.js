import React from 'react';
import TextArea from "../TextArea";
import renderer from  'react-test-renderer'
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.13
 *
 * @Description: Text box input Component Snapshot test
 *
 */
describe('TextArea', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
                const component = renderer.create(<TextArea label="testLabelString1" placeholder="testPlaceholderString2"/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})