/**
 * @Author:     Jeff Hatton
 * @Created:    2021.3.06
 *
 * @Description: Conversation List Snapshot Test
 *
 */
import React from 'react';
import SelectConversation from "../SelectConversation";
import {mockMessages} from "../../../../mockData/MockMessageData";
import ShallowRenderer from "react-test-renderer/shallow";


jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"
        }
    )
);
describe('SelectConversation', () => {
    describe('Snapshot test', () => {
        it('should match snapshot test if listing is NOT empty for userName', () => {
            //given
            const props = {
                messageData: mockMessages,
                myUserId: 1,
            }
            //when
            const renderer = new ShallowRenderer();
            renderer.render(<SelectConversation {...props}/>);
            const result = renderer.getRenderOutput();
            //then
            expect(result).toMatchSnapshot();
        });
    });
});