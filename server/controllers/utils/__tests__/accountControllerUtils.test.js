const reqMock = require('../../../__mocks__/requestMocks');
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
    });

    describe('formatPhoneNumber', () => {
        it('should return a formatted phone number given a valid phone number', () => {
            // expected result
            const expectedPhoneNum = "111-222-3333";

            // given
            const phoneNum = 1112223333;

            // when
            const formattedPhoneNum = accountControllerUtils.formatPhoneNumber(phoneNum);

            // then
            expect(formattedPhoneNum).toBe(expectedPhoneNum);
        });
        it('should return an empty string when given a phone number that does not have exactly 10 digits', () => {
            // expected result
            const expectedPhoneNum = '';

            // given
            const phoneNum = 11122233334444;

            // when
            const formattedPhoneNum = accountControllerUtils.formatPhoneNumber(phoneNum);

            // then
            expect(formattedPhoneNum).toBe(expectedPhoneNum);
        });
        it('should return an empty string when given a phone number is undefined', () => {
            // expected result
            const expectedPhoneNum = '';

            // given
            const phoneNum = undefined;

            // when
            const formattedPhoneNum = accountControllerUtils.formatPhoneNumber(phoneNum);

            // then
            expect(formattedPhoneNum).toBe(expectedPhoneNum);
        });
        it('should return an empty string when given a phone number is null', () => {
            // expected result
            const expectedPhoneNum = '';

            // given
            const phoneNum = null;

            // when
            const formattedPhoneNum = accountControllerUtils.formatPhoneNumber(phoneNum);

            // then
            expect(formattedPhoneNum).toBe(expectedPhoneNum);
        });
        it('should return an empty string when given a phone number is not a number', () => {
            // expected result
            const expectedPhoneNum = '';

            // given
            const phoneNum = "hello";

            // when
            const formattedPhoneNum = accountControllerUtils.formatPhoneNumber(phoneNum);

            // then
            expect(formattedPhoneNum).toBe(expectedPhoneNum);
        });
    });
});