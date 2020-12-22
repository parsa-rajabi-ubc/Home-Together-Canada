/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.19
 *
 * @Description: Large area text input field component Snapshot test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import LargeTextArea from "../LargeTextArea";

jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

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