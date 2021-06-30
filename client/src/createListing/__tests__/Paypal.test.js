/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.16
 *
 * @Description: Paypal Test;
 *
 */

import React from 'react';
import renderer from 'react-test-renderer'
import Paypal from "../Paypal";

jest.mock("react-tooltip/node_modules/uuid", () => ({
            v4: () => "00000000-0000-0000-0000-000000000000"}
    )
);

describe('Paypal', () => {
    describe('Snapshot test', () => {
        it('should match snapshot test regardless of properties', () => {
            // given
            const props = {
                paymentStatus: jest.fn(),
                onTransactionOrderIDChange: jest.fn()
            };
            //when
            const component = renderer.create(<Paypal {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});