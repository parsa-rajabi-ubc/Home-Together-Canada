/**
 * @Author:     Alex Qin
 * @Created:    2021.3.09
 *
 * @Description: MessageBox Test
 *
 */

import React from 'react';
import ShallowRenderer from "react-test-renderer/shallow";
import MessageBox from "../MessageBox";

describe('MessageBox', () => {
    describe('Snapshot test', () => {
        it('should match snapshot test', () => {
            //given
            const props = {
                messageContent: "message content 18 other hour",
                userName: "otherUser18",
                datePosted: "2021-01-14T01:42:39.005Z",
                leftOrRight: "left"
            }

            //when
            const renderer = new ShallowRenderer();
            renderer.render(<MessageBox {...props}/>);
            const result = renderer.getRenderOutput();
            //then
            expect(result).toMatchSnapshot();
        });
    });
});