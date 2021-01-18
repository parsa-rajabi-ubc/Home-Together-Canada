/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.21
 *
 * @Description: Change password input Form Component
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import ChangePassword from "../ChangePassword";

describe('ConfirmPassword', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                onPasswordChangeSubmit: jest.fn(),
                onOldPasswordChange: jest.fn(),
                onNewPasswordChange: jest.fn(),
                onConfirmedPasswordChange: jest.fn(),
                showError: false,
                errorMessage: '',
                oldPassword: 'an_old_password',
                newPassword: 'a_new_password',
                confirmedPassword: 'a_new_password'
            }

            // when
            const component = renderer.create(<ChangePassword {...props} />).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})