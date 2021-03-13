/**
 * @Author:     Jeff Hatton
 * @Created:    2021.3.12
 *
 * @Description: Conversation List Snapshot Test
 *
 */
import React from 'react';
import renderer from 'react-test-renderer'
import ConversationList from "../ConversationList";
import SendMessage from "../SendMessage";

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
                username: "messageMember1",
                otherUser: "otherUser1",
            }
            //when
            const component = renderer.create(<SendMessage {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});