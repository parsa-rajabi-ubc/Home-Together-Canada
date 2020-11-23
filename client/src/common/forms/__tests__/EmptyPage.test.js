/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.23
 *
 * @Description: Blank page Component Snapshot test
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import EmptyPage from "../EmptyPage";

describe('EmptyPage', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            //when
            const component = renderer.create(<EmptyPage/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})