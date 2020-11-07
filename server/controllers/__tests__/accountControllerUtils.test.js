const reqMock = require('../../__mocks__/requestMocks');
const accountControllerUtils = require('../accountControllerUtils');

describe('accountControllerUtils', () => {

    describe('getMailingAddress', () => {
        it('should return correct mailing address when hasDifferentMailingAddress is true', () => {
            // expected result
            const expectedMailingAddress = {
                mailingAddressLine1: "1 Rainbow Road",
                mailingAddressLine2: "Unit 404",
                mailingCity: "Yellowknife",
                mailingProvince: "Northwest Territories",
                mailingPostalCode: "E7I 0Z2"
            }

            // given
            const body = reqMock.req.body;

            // when
            const mailingAddress = accountControllerUtils.getMailingAddress(body);

            // then
            expect(mailingAddress).toEqual(expectedMailingAddress);
        });
        it('should return correct mailing address when hasDifferentMailingAddress is false', () => {
            // expected result
            const expectedMailingAddress = {
                mailingAddressLine1: "2 Luigi's mansion",
                mailingAddressLine2: null,
                mailingCity: "St Johns",
                mailingProvince: "Newfoundland and Labradour",
                mailingPostalCode: "R9Q 3X8"
            }

            // given
            const body = {
                ...reqMock.req.body,
                hasDifferentMailingAddress: false
            };

            // when
            const mailingAddress = accountControllerUtils.getMailingAddress(body);

            // then
            expect(mailingAddress).toEqual(expectedMailingAddress);
        });
    })
})