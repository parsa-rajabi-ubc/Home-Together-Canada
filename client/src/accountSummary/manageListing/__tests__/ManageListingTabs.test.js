/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.06.13
 *
 * @Description: Manage Listing Test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import ManageListingTabs from "../ManageListingTabs";

describe('ManageListingTabs', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                activeTab: "Live"
            }

            // when
            const component = renderer.create(<ManageListingTabs {...props} />).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})