/**
 * @Author:     Jeff Hatton
 * @Created:    2021.1.23
 *
 * @Description: Snapshot test for search results container should render properly
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import SearchResultsContainer from "../SearchResultsContainer";

describe('SearchResultsContainer', () => {
    describe('Container test', () => {
        it('should match snapshot test', () => {
            //when
            const component = renderer.create(<SearchResultsContainer/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});