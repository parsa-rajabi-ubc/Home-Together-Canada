/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.12.19
 *
 * @Description: Yes/No radio button w/ tooltip input Component Snapshot test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import YNButtonsTooltip from "../YNButtonsTooltip";

describe('YNButtonsTooltip', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // Given
            const name = 'testName'
            // when
            const component = renderer.create(<YNButtonsTooltip name={name}/>).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})