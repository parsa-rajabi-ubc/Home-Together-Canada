/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.25
 *
 * @Description: Test for BurgerMenu
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import BurgerMenu from "../BurgerMenu";


describe('BurgerMenu', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                isOpen: true,
                onClose: jest.fn(),
                content: <h1>Hello World</h1>
            };
            //when
            const component = renderer.create(<BurgerMenu {...props}/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})