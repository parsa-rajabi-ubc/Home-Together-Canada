/**
 * @Author:     Alex Qin
 * @Created:    2021.2.12
 *
 * @Description: Classes, Clubs & Events Form Test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import EventsForm from "../EventsForm";

jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('EventsForm', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                onSubmit: jest.fn()
            };
            //when
            const component = renderer.create(<EventsForm {...props}/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})