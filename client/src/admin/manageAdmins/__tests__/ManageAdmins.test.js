/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.3.12
 *
 * @Description: Manage Admins Test
 *
 */

import React from 'react';
import renderer from 'react-test-renderer'
import ManageAdmins from "../ManageAdmins";

describe('ManageAdmins', () => {
    describe('Container test', () => {
        it('should match snapshot test regardless of the props', () => {
            //given
            const props = {
                onSubmit: jest.fn(),
                setSearchUsername: jest.fn(),
                searchUsernameError: true,
                currentAdmins: ["Jack", "John"]
            }
            //when
            const component = renderer.create(<ManageAdmins {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});