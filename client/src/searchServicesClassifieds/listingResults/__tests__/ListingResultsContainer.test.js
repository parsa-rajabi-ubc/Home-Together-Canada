/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Search Listing Filter Container Test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import ListingResultsContainer from "../ListingResultsContainer";
import {BrowserRouter as Router} from "react-router-dom";

describe('ListingResultsContainer', () => {
    describe('Container test', () => {
        it('should match snapshot test', () => {
            //when
            const component = renderer.create(<Router><ListingResultsContainer/></Router>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});