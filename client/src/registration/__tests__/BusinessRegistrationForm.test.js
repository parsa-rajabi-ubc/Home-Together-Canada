import React from 'react';
import renderer from  'react-test-renderer'
import BusinessRegistrationForm from "../BusinessRegistrationForm";

describe('BusinessRegistrationForm', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<BusinessRegistrationForm/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})