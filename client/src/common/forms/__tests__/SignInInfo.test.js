/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.13
 *
 * @Description: Sign in info Component Snapshot test
 *
 */
import React from "react";
import SignInInfo from "../SignInInfo";
import renderer from 'react-test-renderer';

describe('SignInInfo', () => {
        describe('Snapshot test', () => {
                it("should match stored snapshot", () => {
                        // given
                        const onChangeUsername = jest.fn();
                        const onChangePassword = jest.fn();
                        const onChangePasswordCheck = jest.fn();

                        //when
                        const component = renderer.create(<SignInInfo onChangeUsername={onChangeUsername} onChangePassword={onChangePassword} onChangePasswordCheck={onChangePasswordCheck}/>);

                        // then
                        expect(component).toMatchSnapshot();
                });
        })
})