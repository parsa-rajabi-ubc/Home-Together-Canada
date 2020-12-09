import React from 'react';
import renderer from  'react-test-renderer'
import BusinessRegistrationForm from "../BusinessRegistrationForm";
jest.mock("react-tooltip/node_modules/uuid", () => ({ v4: () => "00000000-0000-0000-0000-000000000000" }));

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