/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.20
 *
 * @Description: Business Info Test
 *
 */

import React from 'react';
import renderer from 'react-test-renderer'
import BusinessInfo from "../BusinessInfo";

describe('BusinessInfo', () => {
    describe('Container test', () => {
        it('should match snapshot test if business is not nationWide', () => {
            //given
            const props = {
                logo: "public/images/12.jpg",
                businessName: "Bob the builder",
                isNationWide: false,
                address: ({
                    streetLine1: "123 Kelowna",
                    streetLine2: "",
                    city: "Kelowna",
                    province: "BC",
                    postalCode: "X0X 0X0",
                }),
                website: "www.bob.com",
                phone: "123-413-1341",
                email: "Bob@Builder.ca"
            }
            //when
            const component = renderer.create(<BusinessInfo {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
        it('should match snapshot test if business is nationWide', () => {
            //given
            const props = {
                logo: "public/images/12.jpg",
                businessName: "Bob the builder",
                isNationWide: true,
                address: ({
                    streetLine1: null,
                    streetLine2: null,
                    city: null,
                    province: null,
                    postalCode: null,
                }),
                website: "www.bob.com",
                phone: "123-413-1341",
                email: "Bob@Builder.ca"
            }
            //when
            const component = renderer.create(<BusinessInfo {...props}/>);
            const tree = component.toJSON();
            //then
            expect(tree).toMatchSnapshot();
        });
    });
});