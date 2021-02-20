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
                redirectTo: "/"
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
                redirectTo: "/login"
            };
            //when
            const component = renderer.create(<Router><Confirmation {...props}/></Router>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
    })