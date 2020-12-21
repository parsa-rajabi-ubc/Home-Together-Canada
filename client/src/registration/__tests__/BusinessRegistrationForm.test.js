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

const setAccountType = jest.fn();
const setAuthenticated = jest.fn();

describe('BusinessRegistrationForm', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            setAccountType,
            setAuthenticated
        };
        //when
        const component = renderer.create(<BusinessRegistrationForm {...props}/>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
})