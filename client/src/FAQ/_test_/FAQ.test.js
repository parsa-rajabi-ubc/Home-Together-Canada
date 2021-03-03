/**
 * @Author:     Alex Qin
 * @Created:    2021.2.16
 *
 * @Description: FAQ Component snapshot test. Returns a snapshot.
 *
 */

import React from "react";
import FAQ from "../FAQ";
import renderer from "react-test-renderer";

describe('FAQ', () => {

    describe('Snapshot Test', () => {
        it("should render correctly regardless of properties", () => {
            // given

            //when
            const component = renderer.create(<FAQ/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});