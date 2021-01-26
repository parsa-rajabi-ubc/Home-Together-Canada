/**
 * @Author:     Jeff Hatton/Parsa
 * @Created:    2021.1.24
 *
 * @Description: Snapshot test for member search should render properly depending on what is passed as props;
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import MemberSearchContainer from "../MemberSearchContainer";
import {BrowserRouter, Link} from "react-router-dom";

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('MemberSearchContainer', () => {
    describe('Container test', () => {
        it('should match snapshot test', () => {
            // given
            const props = {
                accountType: null,
                authenticated: false
            };
            //when
            const component = renderer.create(<BrowserRouter><MemberSearchContainer {...props}/></BrowserRouter>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });

    describe('Invalid user component login button', () => {
        it('should render when the user is not authenticated', () => {
            // given
            const props = {
                accountType: 'member',
                authenticated: false
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><MemberSearchContainer {...props}/></BrowserRouter>).root;
            const connectWithMembersButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Login');

            // then
            expect(connectWithMembersButton).toBeDefined();
        });
    });
    describe('Invalid user component sign up button', () => {
        it('should render when the user is not authenticated', () => {
            // given
            const props = {
                accountType: 'member',
                authenticated: false
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><MemberSearchContainer {...props}/></BrowserRouter>).root;
            const connectWithMembersButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Create an account');

            // then
            expect(connectWithMembersButton).toBeDefined();
        });
    });
    describe('Invalid user component login button', () => {
        it('should render when the user is not member', () => {
            // given
            const props = {
                accountType: null,
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><MemberSearchContainer {...props}/></BrowserRouter>).root;
            const connectWithMembersButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Login');

            // then
            expect(connectWithMembersButton).toBeDefined();
        });
    });
    describe('Invalid user component sign up button', () => {
        it('should render when the user is not member', () => {
            // given
            const props = {
                accountType: null,
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><MemberSearchContainer {...props}/></BrowserRouter>).root;
            const connectWithMembersButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Create an account');

            // then
            expect(connectWithMembersButton).toBeDefined();
        });
    });

    describe('Invalid user component login button', () => {
        it('should not render when the user is not authenticated', () => {
            // given
            const props = {
                accountType: 'member',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><MemberSearchContainer {...props}/></BrowserRouter>).root;
            const connectWithMembersButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Login');

            // then
            expect(connectWithMembersButton).toBeUndefined();
        });
    });
    describe('Invalid user component sign up button', () => {
        it('should not render when the user is not authenticated', () => {
            // given
            const props = {
                accountType: 'member',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><MemberSearchContainer {...props}/></BrowserRouter>).root;
            const connectWithMembersButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Sign Up');

            // then
            expect(connectWithMembersButton).toBeUndefined();
        });
    });
    describe('Invalid user component login button', () => {
        it('should not render when the user is not member', () => {
            // given
            const props = {
                accountType: 'member',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><MemberSearchContainer {...props}/></BrowserRouter>).root;
            const connectWithMembersButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Login');

            // then
            expect(connectWithMembersButton).toBeUndefined();
        });
    });
    describe('Invalid user component sign up button', () => {
        it('should not render when the user is not member', () => {
            // given
            const props = {
                accountType: 'member',
                authenticated: true
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><MemberSearchContainer {...props}/></BrowserRouter>).root;
            const connectWithMembersButton = testInstance.findAllByType(Link)
                .find(element => element.props.children === 'Sign Up');

            // then
            expect(connectWithMembersButton).toBeUndefined();
        });
    });
});