import {getConcatenatedErrorMessage, getPhoneNumberFromStrings} from "../registrationUtils";

describe('registrationUtils', () => {

    describe('getPhoneNumberFromStrings', () => {
        it('should return undefined when any part of the phone number is undefined', () => {
            // given
            const areaCode = '111';
            const exchangeCode = '222';
            const stationCode = undefined;

            // when
            const phoneNumber = getPhoneNumberFromStrings(areaCode, exchangeCode, stationCode);

            // then
            expect(phoneNumber).not.toBeDefined();
        });
        it('should return undefined when any part of the phone number is null', () => {
            // given
            const areaCode = '111';
            const exchangeCode = null;
            const stationCode = '3333';

            // when
            const phoneNumber = getPhoneNumberFromStrings(areaCode, exchangeCode, stationCode);

            // then
            expect(phoneNumber).not.toBeDefined();
        });
        it('should return undefined when any part of the phone number is an empty string', () => {
            // given
            const areaCode = '';
            const exchangeCode = '222';
            const stationCode = '3333';

            // when
            const phoneNumber = getPhoneNumberFromStrings(areaCode, exchangeCode, stationCode);

            // then
            expect(phoneNumber).not.toBeDefined();
        });
        it('should return the concatenated phone number when all parts of the phone number are defined', () => {
            // expected result
            const expectedPhoneNumber = 1112223333;

            // given
            const areaCode = '111';
            const exchangeCode = '222';
            const stationCode = '3333';

            // when
            const phoneNumber = getPhoneNumberFromStrings(areaCode, exchangeCode, stationCode);

            // then
            expect(phoneNumber).toBe(expectedPhoneNumber);
        });
    });

    describe('getConcatenatedErrorMessage', () => {
        it('should return a concatenated string of errors', () => {
            // expect result
            const expectedErrorMessage = 'Email already in use.\nUsername already in use.\n';

            // given
            const errors = [
                {
                    msg: 'Email already in use.'
                },
                {
                    msg: 'Username already in use.'
                }
            ];

            // when
            const errorMessage = getConcatenatedErrorMessage(errors);

            // then
            expect(errorMessage).toBe(expectedErrorMessage);
        });
    });
});