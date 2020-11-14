import React from 'react';
import renderer from  'react-test-renderer'
import {Address} from "../Address";

describe('Address', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<Address label="testLabelString1" />).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})