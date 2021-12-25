/**
 * @Author:     Alex Qin
 * @Created:    2021.2.12
 *
 * @Description: Legal, Sales & Insurance Agencies Form Test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import AgenciesForm from "../AgenciesForm";

jest.mock("uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('AgenciesForm', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                onSubmit: jest.fn()
            };
            //when
            const component = renderer.create(<AgenciesForm {...props}/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})