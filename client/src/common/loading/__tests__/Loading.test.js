/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.20
 *
 * @Description: Loading Test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import Loading from "../Loading";

describe('Loading', () => {
    describe('Container test', () => {
        it('should match snapshot test if the page is loading', () => {
            //given
            const props = {
                isLoading: true
            }
            //when
            const component = renderer.create(<Loading {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
        it('should match snapshot test if the page is NOT loading', () => {
            //given
            const props = {
                isLoading: false
            }
            //when
            const component = renderer.create(<Loading {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});