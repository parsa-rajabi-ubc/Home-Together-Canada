/**
 * @Author:     Alex Qin
 * @Created:    2021.3.09
 *
 * @Description: FullConversation Test
 *
 */
import React from 'react';
import FullConversation from "../FullConversation";
import {mockMessages} from "../../../../mockData/MockMessageData";
import ShallowRenderer from "react-test-renderer/shallow";

jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"
        }
    )
);
describe('FullConversation', () => {
    describe('Snapshot test', () => {
        it('should match snapshot test if listing is NOT empty for userName', () => {
            //given
            const props = {
                messageData: mockMessages,
                myUserName: "messageMember1",
                senderId:"otherUser1"
            }
            //when
            const renderer = new ShallowRenderer();
            renderer.render(<FullConversation {...props}/>);
            const result = renderer.getRenderOutput();
            //then
            expect(result).toMatchSnapshot();
        });
    });
});