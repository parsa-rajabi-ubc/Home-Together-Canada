/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Business Listing Filter Container Test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import BusinessListingContainer from "../BusinessListingContainer";

describe('BusinessListingContainer', () => {
    describe('Container test', () => {
        it('should match snapshot test', () => {
            //given
            const props = {

            }
            //when
            const component = renderer.create(<BusinessListingContainer {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});