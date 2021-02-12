/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.25
 *
 * @Description: Test for BurgerMenu
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import SearchArea from "../SearchArea";


describe('SearchArea', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                onChange: jest.fn(),
            };
            //when
            const component = renderer.create(<SearchArea {...props}/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})