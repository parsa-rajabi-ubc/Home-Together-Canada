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
            const label = 'testLabelString1';
            const onChange = jest.fn();
            const className = 'testClassNameString';
            const oldPassword = 'oldPasswordString1';

            // when
            const component = renderer.create(<ChangePassword className={className} label={label} oldPassword={oldPassword} onChange={onChange}/>).toJSON();

            // then
            expect(component).toMatchSnapshot();
        });
    })
})