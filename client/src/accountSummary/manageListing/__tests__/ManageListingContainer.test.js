/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.06.13
 *
 * @Description: Manage Listing Test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import ManageListingContainer from "../ManageListingContainer";

describe('ManageListingContainer', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
            }

            // when
            const component = renderer.create(<ManageListingContainer {...props} />).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})