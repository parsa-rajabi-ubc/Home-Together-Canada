/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.19
 *
 * @Description: Generic input Component Snapshot test
 *
 */

import React from 'react';
import GenericInput from "../GenericInput";
import renderer from  'react-test-renderer'

describe('GenericInput', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const label = 'testLabelString1';
            const type = 'testTypeString1';
            const className = 'testClassNameString';
            const placeholder = 'testPlaceholderString2';

            // when
            const component = renderer.create(<GenericInput className={className} inputType={type} label={label} placeholder={placeholder}/>).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})