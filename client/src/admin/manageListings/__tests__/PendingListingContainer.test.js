/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.3.21
 *
 * @Description: Pending Listing Container
 *
 */

import React from 'react';
import renderer from 'react-test-renderer'
import PendingListingContainer from "../PendingListingContainer";

describe('PendingListingContainer', () => {
    describe('Container test', () => {
        it('should match snapshot test regardless of the props', () => {
            //given
            const props = {
            }
            //when
            const component = renderer.create(<PendingListingContainer {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});