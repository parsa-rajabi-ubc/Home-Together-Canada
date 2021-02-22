/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.19
 *
 * @Description: Confirmation component Snapshot test
 *
 */
import React from 'react';
import renderer from 'react-test-renderer'
import Confirmation from "../Confirmation";
import {BrowserRouter as Router} from "react-router-dom";

describe('Confirmation', () => {
    describe('Component Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //given
            const props = {
                message: "Hello world",
                buttonText: "Potato",
                redirectTo: "/",
                displayButton: false,
                errorColor: false,
            };
            //when
            const component = renderer.create(<Router><Confirmation {...props}/></Router>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
        it("should render correctly regardless of properties", () => {
            //given
            const props = {
                message: "Apples",
                buttonText: "",
                redirectTo: "/login",
                displayButton: true,
                errorColor: true,
            };
            //when
            const component = renderer.create(<Router><Confirmation {...props}/></Router>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
        it("should render correctly regardless of properties", () => {
            //given
            const props = {
                message: "Oranges",
                buttonText: "Summer",
                redirectTo: "/hello",
                displayButton: true,
                errorColor: false,
            };
            //when
            const component = renderer.create(<Router><Confirmation {...props}/></Router>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
        it("should render correctly regardless of properties", () => {
            //given
            const props = {
                message: "Sunshine",
                buttonText: "Blue Sky",
                redirectTo: "/skiing",
                displayButton: false,
                errorColor: true,
            };
            //when
            const component = renderer.create(<Router><Confirmation {...props}/></Router>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
    })