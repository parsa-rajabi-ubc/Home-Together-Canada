/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.3.21
 *
 * @Description: Pending Listing Cards Test
 *
 */

import React from 'react';
import renderer from 'react-test-renderer'
import PendingListingCards from "../PendingListingCards";
import ListingResults from "../../../searchServicesClassifieds/listingResults/ListingResults";
import {BrowserRouter as Router} from "react-router-dom";

describe('PendingListingCards', () => {
    describe('Container test', () => {
        it('should match snapshot test regardless of the props (approved listing)', () => {
            //given
            const props = {
                listingID: 2,
                setListingID: jest.fn(),
                onSubmit: jest.fn(),
                setListingStatus: jest.fn(),
                listingStatus: true,
                pendingListings: [{
                    id: 20,
                    title: "Forest Green Co-Living",
                    shortDescription: "Easy, family friendly, & communal living",
                    createdAt: "2021-03-21T22:16:06.000Z",
                    business: {
                        businessName: "Bob's Bricks",
                    }
                }]
            }
            //when
            const component = renderer.create(<Router><PendingListingCards {...props}/></Router>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
        it('should match snapshot test regardless of the props (rejected listing)', () => {
            //given
            const props = {
                listingID: 3,
                setListingID: jest.fn(),
                onSubmit: jest.fn(),
                setListingStatus: jest.fn(),
                listingStatus: false,
                pendingListings: [{
                    id: 20,
                    title: "Forest Green Co-Living",
                    shortDescription: "Easy, family friendly, & communal living",
                    createdAt: "2021-03-21T22:16:06.000Z",
                    business: {
                        businessName: "Bob's Bricks",
                    }
                }]
            }
            //when
            const component = renderer.create(<Router><PendingListingCards {...props}/></Router>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});