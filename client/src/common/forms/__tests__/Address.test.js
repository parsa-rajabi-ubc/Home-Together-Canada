/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.13
 *
 * @Description: Address Component Snapshot test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import Address from "../Address";

jest.mock("uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('Address', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const label = "testLabelString1";
            const onChange = jest.fn();

            //when
            const component = renderer.create(<Address label={label} onChange={onChange} />).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})