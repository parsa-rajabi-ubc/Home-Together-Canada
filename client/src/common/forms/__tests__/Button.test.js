import React from 'react';
import renderer from  'react-test-renderer'
import {Button} from "../Button";

describe('TextArea', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<Button label="testLabelString1" value="testValueString2"/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})