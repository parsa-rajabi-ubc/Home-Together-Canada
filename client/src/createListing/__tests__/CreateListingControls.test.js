/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.24
 *
 * @Description: Create Listing Controls Test;
 *
 */

import React from 'react';
import renderer from 'react-test-renderer'
import CreateListingControls from "../CreateListingControls";

jest.mock("uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"
        }
    )
);

describe('CreateListingControls', () => {
    describe('Container test', () => {
        it('should match snapshot test if user is a member', () => {
            // given
            const props = {
                isUserMember: true,
                chosenCategory: jest.fn(),
                chosenSubcategories: jest.fn(),
                isSubcategoryEmpty: jest.fn(),
                submit: true
            };
            //when
            const component = renderer.create(<CreateListingControls {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
        it('should match snapshot test if user is a business', () => {
            // given
            const props = {
                isUserMember: false,
                chosenCategory: jest.fn(),
                chosenSubcategories: jest.fn(),
                isSubcategoryEmpty: jest.fn(),
                submit: true
            };
            //when
            const component = renderer.create(<CreateListingControls {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});