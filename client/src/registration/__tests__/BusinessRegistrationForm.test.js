import React from 'react';
import renderer from 'react-test-renderer'
import BusinessRegistrationForm from "../BusinessRegistrationForm";
import { BrowserRouter as Router } from 'react-router-dom';
import MemberRegistrationForm from "../MemberRegistrationForm";


jest.mock("react-tooltip/node_modules/uuid", () => ({
    v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

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
        const component = renderer.create(<Router><BusinessRegistrationForm {...props}/></Router>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});
