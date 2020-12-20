import React from 'react';
import renderer from  'react-test-renderer'
import BusinessRegistrationForm from "../BusinessRegistrationForm";

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

describe('BusinessRegistrationForm', () => {
    it("should render correctly regardless of properties", () => {
        //when
        const component = renderer.create(<BusinessRegistrationForm/>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
})