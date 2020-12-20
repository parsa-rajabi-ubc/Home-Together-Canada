/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.12.19
 *
 * @Description: Large area text input with tooltip field component Snapshot test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import LargeTextAreaToolTip from "../LargeTextAreaToolTip";

describe('LargeTextAreaTooltip', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const name = 'testLabelString2';
            const placeholder = 'testLabelString3';
            const onChangeMock = jest.fn();

            //when
            const component = renderer.create(<LargeTextAreaToolTip name={name} placeholder={placeholder} onChange={onChangeMock} />).toJSON();

            //then
            expect(component).toMatchSnapshot();
        });
    })
})