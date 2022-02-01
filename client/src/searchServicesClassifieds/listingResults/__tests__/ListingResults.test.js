/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Search Listing Filter Container Test
 *
 */

import React from 'react';
import renderer from 'react-test-renderer'
import ListingResults from "../ListingResults";
import {BrowserRouter as Router} from "react-router-dom";
import {mockBusinessListingResponse, mockMemberListingResponse} from "../../../mockData/MockListing";

jest.mock("uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"
        }
    )
);
describe('ListingResultsContainer', () => {
    describe('Snapshot test', () => {
        it('should match snapshot test if listing is NOT empty and listingUser is MEMBER', () => {
            //given
            const props = {
                listingData: [mockMemberListingResponse],
                listingUser: "member",
            }
            //when
            const component = renderer.create(<Router><ListingResults {...props}/></Router>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
        it('should match snapshot test if listing is NOT empty and listingUser is BUSINESS', () => {
            //given
            const props = {
                listingData: [mockBusinessListingResponse],
                listingUser: "business",
            }
            //when
            const component = renderer.create(<Router><ListingResults {...props}/></Router>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});