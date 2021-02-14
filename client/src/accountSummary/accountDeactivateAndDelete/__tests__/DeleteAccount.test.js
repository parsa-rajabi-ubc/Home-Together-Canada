/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.13
 *
 * @Description: tests for DeleteAccount component
 *
 */

import React from 'react';
import renderer from "react-test-renderer";
import DeleteAccount from "../DeleteAccount";
import Button from "../../../common/forms/Button";

const handleDeleteAccount = jest.fn();
const setConfirm = jest.fn();

describe('DeleteAccount', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            confirm: true,
            setConfirm,
            handleDeleteAccount
        };

        //when
        const component = renderer.create(<DeleteAccount {...props}/>);
        const tree = component.toJSON();

        //then
        expect(tree).toMatchSnapshot();
    });
    it('should show Delete Account button when confirm is true', () => {
        // given
        const props = {
            confirm: true,
            setConfirm,
            handleDeleteAccount
        };

        // when
        const testInstance = renderer.create(<DeleteAccount {...props}/>).root;
        const deleteAccountButton = testInstance.findByType(Button);

        // then
        expect(deleteAccountButton.props.value).toBe('Delete Account');
    });
    it('should show not Delete Account button when confirm is false', () => {
        // given
        const props = {
            confirm: false,
            setConfirm,
            handleDeleteAccount
        };

        // when
        const testInstance = renderer.create(<DeleteAccount {...props}/>).root;
        const deleteAccountButton = testInstance.findAllByType(Button);

        // then
        expect(deleteAccountButton).toStrictEqual([]);
    });
});
