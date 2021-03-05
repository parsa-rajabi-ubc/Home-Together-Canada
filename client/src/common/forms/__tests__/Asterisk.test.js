/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.12.19
 *
 * @Description: Asterisk Component Snapshot test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import Asterisk from "../Asterisk";

describe('Asterisk', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<Asterisk/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})