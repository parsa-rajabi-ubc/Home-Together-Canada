/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.12.1
 *
 * @Description: MainLandingPage Component snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from 'react-test-renderer';
import {BrowserRouter as Router} from 'react-router-dom';
import MainLandingPage from "../MainLandingPage";

describe('MainLandingPage', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            const RegistrationLandingPage = (
                <Router>
                    <MainLandingPage/>
                </Router>
            );
            //when
            const component = renderer.create(RegistrationLandingPage).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})