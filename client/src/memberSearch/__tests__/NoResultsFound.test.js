/**
 * @Author:     Jeff Hatton
 * @Created:    2021.1.23
 *
 * @Description: Snapshot test for member search results should render properly;
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import NoResultsFound from "../NoResultsFound";

describe('MemberSearchResults', () => {
    describe('Container test', () => {
        it('should match snapshot test with an empty array', () => {
            //when
            const component = renderer.create(<NoResultsFound/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});