/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.3.15
 *
 * @Description: Manage Users Test
 *
 */

import React from 'react';
import renderer from 'react-test-renderer'
import ManageUsers from "../ManageUsers";

describe('ManageUsers', () => {
    describe('Container test', () => {
        it('should match snapshot test regardless of the props', () => {
            //given
            const props = {
                onSubmit: jest.fn(),
                setSearchUsername: jest.fn(),
                searchUsernameError: true,
                currentBannedUsers: ["Jack", "John"]
            }
            //when
            const component = renderer.create(<ManageUsers {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});