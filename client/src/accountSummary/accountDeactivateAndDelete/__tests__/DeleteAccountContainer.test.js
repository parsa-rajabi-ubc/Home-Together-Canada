/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.02.13
 *
 * @Description: tests for DeleteAccountContainer component
 *
 */

import React from 'react';
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from 'react-router-dom';
import DeleteAccountContainer from "../DeleteAccountContainer";

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

const reset = jest.fn();

describe('DeleteAccountContainer', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            reset
        };

        //when
        const component = renderer.create(<Router><DeleteAccountContainer {...props}/></Router>);
        const tree = component.toJSON();

        //then
        expect(tree).toMatchSnapshot();
    });
});
