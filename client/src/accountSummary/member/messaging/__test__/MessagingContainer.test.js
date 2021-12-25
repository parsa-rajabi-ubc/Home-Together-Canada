/**
 * @Author:     Jeff Hatton
 * @Created:    2021.3.06
 *
 * @Description: Conversation List Snapshot Test
 *
 */
import React from 'react';
import MessagingContainer from "../MessagingContainer";
import ShallowRenderer from "react-test-renderer/shallow";

jest.mock("uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"
        }
    )
);
describe('MessagingContainer', () => {
    describe('Snapshot test', () => {
        it('should match snapshot test if listing is NOT empty for userName', () => {
            //given

            //when
            const renderer = new ShallowRenderer();
            renderer.render(<MessagingContainer/>);
            const result = renderer.getRenderOutput();
            //then
            expect(result).toMatchSnapshot();
        });
    });
});