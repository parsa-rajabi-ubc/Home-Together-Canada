/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Search Listing Filter Container Test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import SearchListingFiltersContainer from "../SearchListingFiltersContainer";

describe('SearchListingFiltersContainer', () => {
    describe('Container test', () => {
        it('should match snapshot test', () => {
            //when
            const component = renderer.create(<SearchListingFiltersContainer/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});