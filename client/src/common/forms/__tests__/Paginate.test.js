/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.25
 *
 * @Description: Test for Paginate
 *
 */

import React from 'react';
import renderer from  'react-test-renderer'
import Paginate from "../Paginate";


describe('Paginate', () => {
    describe('Snapshot test', () => {
        it("should render correctly regardless of properties", () => {
            // given
            const props = {
                data: ["h1", "h2"],
                resultsPerPage: 5
            };
            //when
            const component = renderer.create(<Paginate {...props}/>).toJSON();
            //then
            expect(component).toMatchSnapshot();
        });
    })
})