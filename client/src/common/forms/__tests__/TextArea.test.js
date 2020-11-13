import React from 'react';
import {TextArea} from "../TextArea";
import renderer from  'react-test-renderer'

describe('TextArea', () => {
    describe('Snapshot test', () => {

        it("should render correctly regardless of properties", () => {

            //when
                const component1 = renderer.create(<TextArea label="testLabelString1" placeholder="testPlaceholderString1"/>).toJSON();
            //then
            expect(component1).toMatchSnapshot();

            //when
                const component2 = renderer.create(<TextArea label="testLabelString2" placeholder="testPlaceholderString2"/>).toJSON();
            //then
            expect(component2).toMatchSnapshot();
        });
    })
})