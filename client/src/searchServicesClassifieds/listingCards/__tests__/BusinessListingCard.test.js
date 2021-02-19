/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.18
 *
 * @Description: Business Listing Card Test
 *
 */

import React from 'react';
import BusinessListingCard from "../BusinessListingCard";
import ShallowRenderer from "react-test-renderer/shallow";

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
            const renderer = new ShallowRenderer();
            renderer.render(<BusinessListingCard {...props}/>);
            const result = renderer.getRenderOutput();
            //then
            expect(result).toMatchSnapshot();
        });
    });
});