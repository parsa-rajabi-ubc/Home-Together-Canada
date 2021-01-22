/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.19
 *
 * @Description: Privacy Policy Component snapshot test. Returns a snapshot.
 *
 */

import React from "react";
import renderer from "react-test-renderer";
import PrivacyPolicy from "../PrivacyPolicy";

describe('Privacy Policy', () => {

    describe('Snapshot Test', () => {
        it("should render correctly regardless of properties", () => {
            // given

            //when
            const component = renderer.create(<PrivacyPolicy/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});