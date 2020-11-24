/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.19
 *
 * @Description: Member profile form Component snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import MemberProfileForm from "../MemberProfileForm";
import { BrowserRouter as Router } from 'react-router-dom';

describe('MemberProfileForm', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            const MemberProfile = (
                <Router>
                    <MemberProfileForm />
                </Router>
            )
            //when
            const component = renderer.create(MemberProfile).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})