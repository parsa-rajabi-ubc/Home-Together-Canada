/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.13
 *
 * @Description: tests for DeactivateAccountContainer component
 *
 */

import React from 'react';
import renderer from "react-test-renderer";
import DeactivateAccountContainer from "../DeactivateAccountContainer";

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

describe('DeactivateAccountContainer', () => {
    const reset = jest.fn();
    const setActive = jest.fn();

    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            setActive,
            reset
        };
        //when
        const component = renderer.create(<DeactivateAccountContainer {...props}/>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});
