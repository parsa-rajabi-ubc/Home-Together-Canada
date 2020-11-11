import React from "react";
import SignInInfo from "./SignInInfo";
import renderer from 'react-test-renderer';

test("SignInInfo Snapshot Test", () => {
        const component = renderer.create(<SignInInfo/>);
        expect(component).toMatchSnapshot();
});