/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.3.12
 *
 * @Description: Admin Container Test
 *
 */

import React from 'react';
import renderer from 'react-test-renderer'
import AdminContainer from "../AdminContainer";

describe('AdminContainer', () => {
    describe('Container test', () => {
        it('should match snapshot test regardless of the props', () => {
            //given
            const props = {}
            //when
            const component = renderer.create(<AdminContainer {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});