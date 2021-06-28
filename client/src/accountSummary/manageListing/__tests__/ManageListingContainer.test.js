/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.06.13
 *
 * @Description: Manage Listing Test
 *
 */
import React from 'react';
import ManageListingContainer from "../ManageListingContainer";
import {BrowserRouter} from "react-router-dom";
import ShallowRenderer from 'react-test-renderer/shallow';

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

describe('ManageListingContainer', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                accountType: 'member'
            };
            const renderer = new ShallowRenderer();

            // when
            renderer.render(<BrowserRouter><ManageListingContainer {...props} /></BrowserRouter>);
            const help = renderer.getRenderOutput();

            // then
            expect(help).toMatchSnapshot();
        });
    })
});