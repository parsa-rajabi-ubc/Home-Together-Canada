/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.19
 *
 * @Description: Terms of Service Component snapshot test. Returns a snapshot.
 *
 */

import React from "react";
import TermsOfService from "../TermsOfService";
import renderer from "react-test-renderer";

describe('TermsOfService', () => {

    describe('Snapshot Test', () => {
        it("should render correctly regardless of properties", () => {
            // given

            //when
            const component = renderer.create(<TermsOfService/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});