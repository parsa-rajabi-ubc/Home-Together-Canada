/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.3.15
 *
 * @Description: Manage Users Test
 *
 */

import React from 'react';
import renderer from 'react-test-renderer'
import ManageUsersContainer from "../ManageUsersContainer";

describe('ManageUsersContainer', () => {
    describe('Container test', () => {
        it('should match snapshot test regardless of the props', () => {
            //given
            const props = {
            }
            //when
            const component = renderer.create(<ManageUsersContainer {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});