/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.13
 *
 * @Description: Checkbox Component Snapshot test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import Checkbox from "../Checkbox";

jest.mock("uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('Checkbox', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<Checkbox label="testLabelString1" onchange={onchange} checked={true} />).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})