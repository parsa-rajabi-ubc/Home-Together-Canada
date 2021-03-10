/**
 * @Author:     Alex Qin
 * @Created:    2021.3.09
 *
 * @Description: FullConversation Test
 *
 */
import React from 'react';
import renderer from 'react-test-renderer'
import {BrowserRouter as Router} from "react-router-dom";
import FullConversation from "../FullConversation";
import {mockMessages} from "../../../../mockData/MockMessageData";

jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"
        }
    )
);
describe('ConversationList', () => {
    describe('Snapshot test', () => {
        it('should match snapshot test if listing is NOT empty for userName', () => {
            //given
            const props = {
                messageData: mockMessages,
                myUserName: "messageMember1",
                senderId:"otherUser1"
            }
            //when
            const component = renderer.create(<Router><FullConversation {...props}/></Router>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});