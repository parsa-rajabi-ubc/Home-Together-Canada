/**
 * @Author:     Jeff Hatton
 * @Created:    2021.3.06
 *
 * @Description: Member Listing Card Test
 *
 */

import React from 'react';
import ShallowRenderer from "react-test-renderer/shallow";
import ConversationCard from "../ConversationCard";

describe('ConversationCard', () => {
    describe('Snapshot test', () => {
        it('should match snapshot test', () => {
            //given
            const props = {
                messageContent: "message content 18 other hour",
                userName: "otherUser18",
                datePosted: "2021-01-14T01:42:39.005Z"
            }

            //when
            const renderer = new ShallowRenderer();
            renderer.render(<ConversationCard onClick={jest.fn()} {...props}/>);
            const result = renderer.getRenderOutput();
            //then
            expect(result).toMatchSnapshot();
        });
    });
});