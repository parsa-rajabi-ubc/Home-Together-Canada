import React from "react";
import {SignInInfo} from "../SignInInfo";
import renderer from 'react-test-renderer';
describe('SignInInfo', () => {
        describe('Snapshot test', () => {
                it("should match stored snapshot", () => {
                        //when
                        const component = renderer.create(<SignInInfo/>);

                        //then
                        expect(component).toMatchSnapshot();
                });
        })
})