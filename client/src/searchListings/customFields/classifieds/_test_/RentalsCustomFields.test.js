/**
 * @Author:     Alex Qin
 * @Created:    2021.02.21
 *
 * @Description: RentalsCustomFields snapshot test. Returns a snapshot.
 *
 */
import React from 'react';
import renderer from  'react-test-renderer'
import {BrowserRouter as Router} from "react-router-dom";
import {rentalsMockCustomFields} from "../../../../mockData/MockClassifiedsCustomFields";
import RentalsCustomFields from "../RentalsCustomFields";

describe('RentalsCustomFields', () => {
    it("should render correctly regardless of properties", () => {
        // given
        const props = {
            ...rentalsMockCustomFields,
        };
        //when
        const component = renderer.create(<Router><RentalsCustomFields {...props}/></Router>);
        const tree = component.toJSON();
        //then
        expect(tree).toMatchSnapshot();
    });
});