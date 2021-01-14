/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description: Testing Status Component
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import Status from "../Status";
import {dropdownDefaultCSS} from "../../../css/dropdownCSSUtil";

describe('Status', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
           const onChange = jest.fn();
            // when
            const component = renderer.create(<Status name={name} onChange={onChange} dropdownCSS={dropdownDefaultCSS} isDropdownMulti={false}/>).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})