/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.19
 *
 * @Description: Member interested area form Component snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import MemberProfileForm from "../MemberProfileForm";

describe('MemberProfileForm', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<MemberProfileForm/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})