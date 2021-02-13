/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.19
 *
 * @Description: Member profile form Component snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import MemberRegistrationForm from "../MemberRegistrationForm";
import { BrowserRouter as Router } from 'react-router-dom';

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
const setIsAdmin = jest.fn();
const setAuthenticated = jest.fn();

describe('MemberRegistrationForm', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            setAccountType,
            setIsAdmin,
            setAuthenticated
        };
        //when
        const component = renderer.create(<Router><MemberRegistrationForm {...props}/></Router>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});
