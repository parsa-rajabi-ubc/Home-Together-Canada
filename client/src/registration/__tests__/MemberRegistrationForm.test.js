/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.19
 *
 * @Description: Member profile form Component snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import MemberRegistrationForm from "../MemberRegistrationForm";
jest.mock("react-tooltip/node_modules/uuid", () => ({ v4: () => "00000000-0000-0000-0000-000000000000" }));


describe('MemberProfileForm', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<MemberRegistrationForm />).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})