/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.21
 *
 * @Description: Yes/No radio button input Component Snapshot test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import YNButton from "../YNButtons";

jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('YNButtons', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // Given
            const label = 'testLabelString1';
            const name = 'testName'
            // when
            const component = renderer.create(<YNButton label={label} name={name}/>).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})