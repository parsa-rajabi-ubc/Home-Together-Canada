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

describe('ManageListingTabs', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties (Member)", () => {
            // given
            const props = {
                activeTab: jest.fn(),
                accountType: 'member'
            }

            // when
            const component = renderer.create(<ManageListingTabs {...props} />).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
        it("should render correctly regardless of properties (Business)", () => {
            // given
            const props = {
                activeTab: jest.fn(),
                accountType: 'business'
            }

            // when
            const component = renderer.create(<ManageListingTabs {...props} />).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})