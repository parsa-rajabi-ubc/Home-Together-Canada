/**
 * @Author:     Jeff Hatton
 * @Created:    2021.2.19
 *
 * @Description: Member Listing Card Test
 *
 */

import React from 'react';
import ShallowRenderer from "react-test-renderer/shallow";
import MemberListingCard from "../MemberListingCard";

describe('MemberListingCard', () => {
    describe('Container test', () => {
        it('should match snapshot test', () => {
            //given
            const props = {
                    title: "Rooms for Rent",
                    shortDescription: "3 Furnished Rooms, for students preferably",
                    monthlyCost: 650,
                    petFriendly: false,
                    smokeFriendly: true,
                    datePosted: "2021-02-14T07:42:39.000Z"
                }

            //when
            const renderer = new ShallowRenderer();
            renderer.render(<MemberListingCard {...props}/>);
            const result = renderer.getRenderOutput();
            //then
            expect(result).toMatchSnapshot();
        });
    });
});