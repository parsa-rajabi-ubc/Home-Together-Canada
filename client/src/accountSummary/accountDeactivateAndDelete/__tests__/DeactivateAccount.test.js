/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.13
 *
 * @Description: tests for DeactivateAccount component
 *
 */

import React from 'react';
import renderer from "react-test-renderer";
import DeactivateAccount from "../DeactivateAccount";
import {BrowserRouter} from "react-router-dom";
import Button from "../../../common/forms/Button";

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

const handleReasonsChange = jest.fn();
const activateAccount = jest.fn();
const deactivateAccount = jest.fn();

describe('DeactivateAccount', () => {
    it("snapshot reflects component accurately", () => {
        // given
        const props = {
            active: true,
            handleReasonsChange,
            activateAccount,
            deactivateAccount
        };

        //when
        const component = renderer.create(<DeactivateAccount {...props}/>);
        const tree = component.toJSON();

        //then
        expect(tree).toMatchSnapshot();
    });
    it('should show button to deactivate account when activate is true', () => {
        // given
        const props = {
            active: true,
            handleReasonsChange,
            activateAccount,
            deactivateAccount
        };

        // when
        const testInstance = renderer.create(<BrowserRouter><DeactivateAccount {...props}/></BrowserRouter>).root;
        const deactivateAccountButton = testInstance.findByType(Button);

        // then
        expect(deactivateAccountButton.props.value).toBe('Deactivate Account');
    });
    it('should show button to activate account when activate is true', () => {
        // given
        const props = {
            active: false,
            handleReasonsChange,
            activateAccount,
            deactivateAccount
        };

        // when
        const testInstance = renderer.create(<BrowserRouter><DeactivateAccount {...props}/></BrowserRouter>).root;
        const reactivateAccountButton = testInstance.findByType(Button);

        // then
        expect(reactivateAccountButton.props.value).toBe('Re-Activate Account');
    });
});
