/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.4
 *
 * @Description: Member Home Share Form Test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import MemberHomeShareForm from "../MemberHomeShareForm";

jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('MemberHomeShareForm', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                onSubmit: jest.fn()
            };
            //when
            const component = renderer.create(<MemberHomeShareForm {...props}/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})