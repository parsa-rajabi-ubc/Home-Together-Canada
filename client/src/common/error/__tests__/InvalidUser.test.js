/**
 * @Author:     Jeff Hatton
 * @Created:    2020.01.24
 *
 * @Description: InvalidUser component Snapshot test
 *
 */
import React from 'react';
import renderer from 'react-test-renderer'
import InvalidUser from "../InvalidUser";
import {BrowserRouter} from "react-router-dom";

jest.mock('react-redux', () => ({
    connect: () => {
        return (component) => {
            return component
        };
    }
}));

describe('InvalidUser', () => {
    describe('Component Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //given
            const props = {
                message: "Hello world"
            };
            //when
            const component = renderer.create(<BrowserRouter><InvalidUser {...props}/></BrowserRouter>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
    })