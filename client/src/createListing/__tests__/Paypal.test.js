/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.16
 *
 * @Description: Paypal Test;
 *
 */

import React from 'react';
import renderer from 'react-test-renderer'
import Paypal, {PAYMENT_STATUS} from "../Paypal";

describe('Paypal', () => {
    describe('Snapshot test', () => {
        it('should match snapshot test regardless of properties', () => {
            // given
            const props = {
                paymentStatus: PAYMENT_STATUS.APPROVED
            };
            //when
            const component = renderer.create(<Paypal {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
        it('should match snapshot test regardless of properties', () => {
            // given
            const props = {
                paymentStatus: PAYMENT_STATUS.CANCELLED
            };
            //when
            const component = renderer.create(<Paypal {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
        it('should match snapshot test regardless of properties', () => {
            // given
            const props = {
                paymentStatus: PAYMENT_STATUS.ERROR
            };
            //when
            const component = renderer.create(<Paypal {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});