/**
 * @Author:     Jeff Hatton
 * @Created:    2021.2.11
 *
 * @Description: Cohousing Form Test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import CohousingForm from "../CohousingForm";

describe('CohousingForm', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                onSubmit: jest.fn()
            };
            //when
            const component = renderer.create(<CohousingForm {...props}/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})