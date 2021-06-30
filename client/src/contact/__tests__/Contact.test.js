/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.06.15
 *
 * @Description: Contact Page Test
 *
 */

import React from "react";
import Contact from "../Contact";
import renderer from "react-test-renderer";

describe('Contact', () => {
    describe('Snapshot Test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<Contact/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});