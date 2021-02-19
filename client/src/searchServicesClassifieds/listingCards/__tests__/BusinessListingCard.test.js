/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Business Listing Card Test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import BusinessListingCard from "../BusinessListingCard";
import PropTypes from "prop-types";

describe('BusinessListingCard', () => {
    describe('Container test', () => {
        it('should match snapshot test', () => {
            //given
            const props = {
                logo: "Potato",
                title: "Soup",
                businessName: "Pasta",
                shortDescription: "Snow",
                datePosted: "2021-02-14T05:42:39.000Z",
            }
            
            //when
            const component = renderer.create(<BusinessListingCard {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});