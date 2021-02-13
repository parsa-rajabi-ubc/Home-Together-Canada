/**
 * @Author:     Alex Qin
 * @Created:    2021.2.12
 *
 * @Description: Rentals Form Test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import RentalsForm from "../RentalsForm";

describe('RentalsForm', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                onSubmit: jest.fn()
            };
            //when
            const component = renderer.create(<RentalsForm {...props}/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})