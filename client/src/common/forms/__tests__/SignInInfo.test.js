import React from "react";
import SignInInfo from "../SignInInfo";
import renderer from 'react-test-renderer';
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.13
 *
 * @Description: Sign in info Component Snapshot test
 *
 */
describe('SignInInfo', () => {
        describe('Snapshot test', () => {
                it("should match stored snapshot", () => {
                        //when
                        const component = renderer.create(<SignInInfo/>);

                        //then
                        expect(component).toMatchSnapshot();
                });
        })
})