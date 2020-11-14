import React from 'react';
import renderer from  'react-test-renderer'
import Checkbox from "../Checkbox";

describe('Checkbox', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<Checkbox label="testLabelString1" onchange={onchange} />).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})