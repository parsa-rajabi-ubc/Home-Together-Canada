/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.12.19
 *
 * @Description: CheckboxTooltip Component Snapshot test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import CheckboxTooltip from "../CheckboxTooltip";

describe('CheckboxTooltip', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<CheckboxTooltip onchange={onchange} checked={true} />).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})