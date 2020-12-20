/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.12.19
 *
 * @Description: LabelAsterisk Component Snapshot test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import LabelAsterisk from "../LabelAsterisk";

describe('LabelAsterisk', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            const label = "testLabel"
            //when
            const component = renderer.create(<LabelAsterisk label={label}/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})