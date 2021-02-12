/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.24
 *
 * @Description: Create Listing Container Test;
 *
 */

import React from 'react';
import renderer from 'react-test-renderer'
import CreateListingContainer from "../CreateListingContainer";
import {BrowserRouter as Router} from "react-router-dom";
import PropTypes from "prop-types";

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"
        }
    )
);

describe('CreateListingContainer', () => {
    describe('Container test', () => {
        it('should match snapshot test if the user is a member', () => {
            // given
            const props = {
                accountType: "member",
                authenticated: true
            };
            //when
            const component = renderer.create(<Router><CreateListingContainer {...props}/></Router>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
        it('should match snapshot test if the user is a business', () => {
            // given
            const props = {
                accountType: "business",
                authenticated: true
            };
            //when
            const component = renderer.create(<Router><CreateListingContainer {...props}/></Router>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
        it('should match snapshot test if the user is not logged in', () => {
            // given
            const props = {
                accountType: null,
                authenticated: true
            };
            //when
            const component = renderer.create(<Router><CreateListingContainer {...props}/></Router>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});