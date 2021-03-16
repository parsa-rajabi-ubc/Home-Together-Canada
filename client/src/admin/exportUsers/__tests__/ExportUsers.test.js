/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.3.12
 *
 * @Description: Manage Admins Test
 *
 */

import React from 'react';
import renderer from 'react-test-renderer'
import ExportUsers from "../ExportUsers";

describe('ExportUsers', () => {
    describe('Container test', () => {
        it('should match snapshot test regardless of the props', () => {
            //given
            const props = {
            }
            //when
            const component = renderer.create(<ExportUsers {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});