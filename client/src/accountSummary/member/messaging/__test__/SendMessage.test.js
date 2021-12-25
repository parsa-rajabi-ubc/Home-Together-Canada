/**
 * @Author:     Alex Qin
 * @Created:    2021.3.12
 *
 * @Description: Send Message Snapshot Test
 *
 */
import React from 'react';
import renderer from 'react-test-renderer'
import SendMessage from "../SendMessage";

jest.mock("uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"
        }
    )
);
describe('SendMessage', () => {
    describe('Snapshot test', () => {
        it('should match snapshot test of SendMessage', () => {
            //given
            const props = {
                receiverUsername: "member2",
                receiverId: 2,
            }
            //when
            const component = renderer.create(<SendMessage {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});