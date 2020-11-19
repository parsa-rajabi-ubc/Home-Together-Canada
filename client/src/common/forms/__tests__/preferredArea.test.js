/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.19
 *
 * @Description: Phone number input fields Component Snapshot test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import PreferredArea from "../preferredArea";

describe('PreferredArea.test.js', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {

            //when
            const component = renderer.create(<PreferredArea/>).toJSON();

            //then
            expect(component).toMatchSnapshot();
        });
    })
})