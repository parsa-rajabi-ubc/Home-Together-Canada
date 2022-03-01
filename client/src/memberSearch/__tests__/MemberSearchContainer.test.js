/**
 * @Author:     Jeff Hatton/Parsa
 * @Created:    2021.1.24
 *
 * @Description: Snapshot test for member search should render properly depending on what is passed as props;
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import ShallowRenderer from 'react-test-renderer/shallow';
import MemberSearchContainer from "../MemberSearchContainer";
import {BrowserRouter, Link} from "react-router-dom";
import InvalidUser from "../../common/error/InvalidUser";

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

jest.mock("uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('MemberSearchContainer', () => {
    const reset = jest.fn();
    const setMemberSearchResults = jest.fn();

    describe('Container test', () => {
        it('should match snapshot test', () => {
            // given
            const props = {
                accountType: null,
                authenticated: false,
                reset,
                setMemberSearchResults
            };
            //when
            const component = renderer.create(<BrowserRouter><MemberSearchContainer {...props}/></BrowserRouter>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });

    describe('Invalid user component', () => {
        it('should render when the user is not authenticated', () => {
            // given
            const props = {
                accountType: null,
                authenticated: false,
                reset,
                setMemberSearchResults
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><MemberSearchContainer {...props}/></BrowserRouter>).root;
            const invalidUserComponent = testInstance.findByType(InvalidUser);

            // then
            expect(invalidUserComponent).toBeDefined();
        });
        it('should render when the user is not a member', () => {
            // given
            const props = {
                accountType: 'business',
                authenticated: true,
                reset,
                setMemberSearchResults
            };

            // when
            const testInstance = renderer.create(<BrowserRouter><MemberSearchContainer {...props}/></BrowserRouter>).root;
            const invalidUserComponent = testInstance.findByType(InvalidUser);

            // then
            expect(invalidUserComponent).toBeDefined();
        });
    });

    describe('Member Search Container component', () => {
        it('should render when the user is a member and authenticated', () => {
            // given
            const props = {
                accountType: 'member',
                authenticated: true,
                reset,
                setMemberSearchResults
            };

            // when
            const renderer = new ShallowRenderer();
            renderer.render(<BrowserRouter><MemberSearchContainer {...props}/></BrowserRouter>);
            const result = renderer.getRenderOutput();

            // then
            expect(result).toMatchSnapshot();
        });
    });
});