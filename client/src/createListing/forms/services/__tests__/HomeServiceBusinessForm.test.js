/**
 * @Author:     Jeff Hatton
 * @Created:    2021.2.11
 *
 * @Description: Home share business services form Test
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import HomeServiceBusinessForm from "../HomeServiceBusinessForm";
import {BUSINESS_SERVICE_CATEGORIES} from "../../../constants/serviceListingCategoriesText";

jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('HomeServiceBusinessForm', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                onSubmit: jest.fn(),
                category: BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES
            };
            //when
            const component = renderer.create(<HomeServiceBusinessForm {...props}/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})