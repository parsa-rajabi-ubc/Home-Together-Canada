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

describe('MemberProfileForm', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            setAccountType,
            setIsAdmin,
            setAuthenticated
        };
        //when
        const component = renderer.create(<MemberRegistrationForm {...props}/>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
})