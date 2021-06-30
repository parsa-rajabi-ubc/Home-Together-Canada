/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.06.13
 *
 * @Description: Manage Listing Test
 *
 */
import React from 'react';
import renderer from 'react-test-renderer'
import ManageListingTabs from "../ManageListingTabs";
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));


describe('ManageListingTabs', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties (Member)", () => {
            // given
            const props = {
                setActiveTab: jest.fn(),
                accountType: 'member'
            }

            // when
            const component = renderer.create(<Router><ManageListingTabs {...props} /></Router>).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
        it("should render correctly regardless of properties (Business)", () => {
            // given
            const props = {
                setActiveTab: jest.fn(),
                accountType: 'business'
            }

            // when
            const component = renderer.create(<Router><ManageListingTabs {...props} /></Router>).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})