/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Search Listing Filter Container Test
 *
 */

import React from 'react';
import renderer from 'react-test-renderer'
import SearchListingContainer from "../SearchListingContainer";

jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

describe('SearchListingContainer', () => {
    describe('Container test', () => {
        it('should match snapshot test', () => {
            // given
            const props = {
                listingPage: 'services',
                setServiceListingsSearchResults: jest.fn(),
                setClassifiedListingsSearchResults: jest.fn(),
                setServiceListingsSearchFilters: jest.fn(),
                setClassifiedListingsSearchFilters: jest.fn()
            }

            //when
            const component = renderer.create(<SearchListingContainer {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});