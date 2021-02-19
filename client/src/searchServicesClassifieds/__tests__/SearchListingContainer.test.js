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
import {MemoryRouter} from "react-router-dom";


describe('SearchListingContainer', () => {
    describe('Container test', () => {
        it('should match snapshot test', () => {
            //when
            const component = renderer.create(
                // using MemoryRouter to test useHistory() as per https://reactrouter.com/web/guides/testing
                <MemoryRouter>
                    <SearchListingContainer/>
                </MemoryRouter>
            );
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});