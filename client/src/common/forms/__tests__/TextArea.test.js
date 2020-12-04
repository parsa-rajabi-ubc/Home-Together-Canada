/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.13
 *
 * @Description: Text box input Component Snapshot test
 *
 */

import React from 'react';
import TextArea from "../TextArea";
import renderer from  'react-test-renderer'

describe('TextArea', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // then
            const label = 'testLabelString1';
            const className = 'testClassNameString';
            const placeholder = 'testPlaceholderString2';

            // when
            const component = renderer.create(<TextArea className={className} label={label} placeholder={placeholder}/>).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})