import React from "react";
import SignInInfo from "../SignInInfo";
import renderer from 'react-test-renderer';
describe('SignInInfo', () => {
        describe('Snapshot test', () => {
                it("should match stored snapshot", () => {
                        const component = renderer.create(<SignInInfo/>);
                        expect(component).toMatchSnapshot();
                });
        })
})