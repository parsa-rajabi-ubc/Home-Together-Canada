/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.19
 *
 * @Description: Member profile form Component snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom';
import MemberRegistrationForm from "../MemberRegistrationForm";

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