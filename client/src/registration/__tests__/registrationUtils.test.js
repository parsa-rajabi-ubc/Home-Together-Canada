import {
    getConcatenatedErrorMessage,
    getPhoneNumberFromStrings,
    getFirstErrorMessage,
    validatePassword,
    isValueNegative
} from "../registrationUtils";

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
        it('should return an empty string if errors is empty', () => {
            // expected result
            const expectedErrorMessage = '';

            // given
            const errors = [];

            // when
            const errorMessage = getConcatenatedErrorMessage(errors);

            // then
            expect(errorMessage).toBe(expectedErrorMessage);
        });
        it('should return an empty string if errors is empty', () => {
            // expected result
            const expectedErrorMessage = '';

            // given
            const errors = undefined;

            // when
            const errorMessage = getConcatenatedErrorMessage(errors);

            // then
            expect(errorMessage).toBe(expectedErrorMessage);
        });
    });

    describe('getFirstErrorMessage', () => {
        it('should return a concatenated string of errors', () => {
            // expect result
            const expectedErrorMessage = 'Email already in use.';

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
            const errorMessage = getFirstErrorMessage(errors);

            // then
            expect(errorMessage).toBe(expectedErrorMessage);
        });
        it('should return an empty string if errors is empty', () => {
            // expected result
            const expectedErrorMessage = '';

            // given
            const errors = [];

            // when
            const errorMessage = getFirstErrorMessage(errors);

            // then
            expect(errorMessage).toBe(expectedErrorMessage);
        });
        it('should return an empty string if errors is empty', () => {
            // expected result
            const expectedErrorMessage = '';

            // given
            const errors = undefined;

            // when
            const errorMessage = getFirstErrorMessage(errors);

            // then
            expect(errorMessage).toBe(expectedErrorMessage);
        });
    });

    describe('validatePassword', () => {
        it('should return true if password does not contain a number', () => {
            // given
            const password = 'Password';
            const setter = jest.fn();

            // then
            expect(validatePassword(password, setter)).toBe(true);
        });
        it('should return true if password does not contain a lowercase letter', () => {
            // given
            const password = 'PASSWORD123';
            const setter = jest.fn();

            // then
            expect(validatePassword(password, setter)).toBe(true);
        });
        it('should return true if password does not contain an uppercase letter', () => {
            // given
            const password = 'password123';
            const setter = jest.fn();

            // then
            expect(validatePassword(password, setter)).toBe(true);
        });
        it('should throw an error if password contains less than 8 characters', () => {
            // given
            const password = 'AbC123';
            const setter = jest.fn();

            // then
            expect(validatePassword(password, setter)).toBe(true);
        });
        it('should return false if password is at least characters long and contains a number, lowercase and ' +
            'upper case letter', () => {
            // given
            const password = 'Password123';
            const setter = jest.fn();

            // then
            expect(validatePassword(password, setter)).toBe(false);
        });
    });

    describe('isValueNegative', () => {
        it('should return true when a negative value is passed in', () => {
            // expect result
            const expectedResult = true;

            // given
            const value = -3;

            // when
            const output = isValueNegative(value);

            // then
            expect(output).toBe(expectedResult);
        });
        it('should return false when a positive value is passed in', () => {
            // expect result
            const expectedResult = false;

            // given
            const value = 3;

            // when
            const output = isValueNegative(value);

            // then
            expect(output).toBe(expectedResult);
        });
    });

    describe('validateMinMax', () => {
        it('should return true when a negative value is passed in', () => {
            // expect result
            const expectedResult = true;

            // given
            const value = -3;
            const setState = jest.fn();
            // when
            const output = validateMinMax(value, setState);

            // then
            expect(output).toBe(expectedResult);
        });
        it('should return false when a positive value is passed in ', () => {
            // expect result
            const expectedResult = false;

            // given
            const value = 5;
            const setState = jest.fn();

            // when
            const output = validateMinMax(value, setState);

            // then
            expect(output).toBe(expectedResult);
        });
        it('should return true when an empty value is passed in', () => {
            // expect result
            const expectedResult = true;

            // given
            const value = "";
            const setState = jest.fn();
            // when
            const output = validateMinMax(value, setState);

            // then
            expect(output).toBe(expectedResult);
        });
    });
});
