/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.20
 *
 * @Description: Business Listing Filter Container Test
 *
 */

import React from 'react';
import renderer from 'react-test-renderer'
import BusinessListingContainer from "../BusinessListingContainer";
import {MemoryRouter} from "react-router-dom";

describe('BusinessListingContainer', () => {
    describe('Container test', () => {
        it('should match snapshot test', () => {
            //given
            const props = {}
            //when
            const component = renderer.create(
                <MemoryRouter>
                    <BusinessListingContainer {...props}/>
                </MemoryRouter>
            );
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});