/**
 * @Author:     Jeff Hatton
 * @Created:    2021.2.11
 *
 * @Description: Government services Form Test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import GovernmentServicesForm from "../GovernmentServicesForm";

describe('GovernmentServicesForm', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                onSubmit: jest.fn()
            };
            //when
            const component = renderer.create(<GovernmentServicesForm {...props}/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})