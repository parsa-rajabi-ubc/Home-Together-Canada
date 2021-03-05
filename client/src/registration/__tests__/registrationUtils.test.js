import {
    getConcatenatedErrorMessage,
    getPhoneNumberFromStrings,
    getFirstErrorMessage,
    validatePassword,
    isValueNegative,
    validateMinMax,
    resolveYesNoToBoolean,
    validateArrayInput, validateCheckbox, validateMinMaxFilter, validatePostalCode
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
        const setMinStateMock = jest.fn();
        const setMaxStateMock = jest.fn();

        const emptyString = "";
        const undefinedValue = undefined;
        const nullValue = null;
        const negativeValue = -1;
        const positiveValue = 100;
        it.each`
            min                 | max               | expected
            ${emptyString}      | ${emptyString}    | ${true}
            ${emptyString}      | ${undefinedValue} | ${true}
            ${emptyString}      | ${nullValue}      | ${true}
            ${emptyString}      | ${negativeValue}  | ${true}
            ${emptyString}      | ${positiveValue}  | ${true}
            ${undefinedValue}   | ${emptyString}    | ${true}
            ${undefinedValue}   | ${undefinedValue} | ${true}
            ${undefinedValue}   | ${nullValue}      | ${true}
            ${undefinedValue}   | ${negativeValue}  | ${true}
            ${undefinedValue}   | ${positiveValue}  | ${true}
            ${nullValue}        | ${emptyString}    | ${true}
            ${nullValue}        | ${undefinedValue} | ${true}
            ${nullValue}        | ${nullValue}      | ${true}
            ${nullValue}        | ${negativeValue}  | ${true}
            ${nullValue}        | ${positiveValue}  | ${true}
            ${negativeValue}    | ${emptyString}    | ${true}
            ${negativeValue}    | ${undefinedValue} | ${true}
            ${negativeValue}    | ${nullValue}      | ${true}
            ${negativeValue}    | ${negativeValue}  | ${true}
            ${negativeValue}    | ${positiveValue}  | ${true}
            ${positiveValue}    | ${emptyString}    | ${true}
            ${positiveValue}    | ${undefinedValue} | ${true}
            ${positiveValue}    | ${nullValue}      | ${true}
            ${positiveValue}    | ${negativeValue}  | ${true}
            ${1000}             | ${500}            | ${true}
            ${500}              | ${1000}           | ${false}
        `('returns $expected when $min and $max are provided', ({ min, max, expected }) => {
            expect(validateMinMax(min, max, setMinStateMock, setMaxStateMock)).toBe(expected);
        })
    });

    describe('resolveYesNoToBoolean', () => {
        const yes = 'yes';
        const no = 'no';
        const nullValue = null;
        const emptyString = '';
        const undefinedValue = undefined;

        it.each`
            str                 | expected
            ${yes}              | ${true}
            ${no}               | ${false}
            ${nullValue}        | ${false}
            ${emptyString}      | ${false}
            ${undefinedValue}   | ${false}
        `('returns $expected when $str is provided', ({str, expected}) => {
            expect(resolveYesNoToBoolean(str)).toBe(expected);
        });
    });

    describe('validateArrayInput', () => {
        const setStateVarMock = jest.fn();
        const undefinedArray = undefined;
        const nullArray = null;
        const notArray = { objectName: 'Hello' };
        const emptyArray = [];
        const validArray = ['Hi', 'Hello', 'Hola', 'Bonjour'];
        it.each`
            array               | expectedResult
            ${undefinedArray}   | ${true}
            ${nullArray}        | ${true}
            ${notArray}         | ${true}
            ${emptyArray}       | ${true}
            ${validArray}       | ${false}
        `('returns $expectedResult when $array is provided',
            ({array, expectedResult}) => {
                    expect(validateArrayInput(array, setStateVarMock)).toBe(expectedResult);
            });
    });

    describe('validateMinMaxFilter', () => {
        const setMinStateMock = jest.fn();
        const setMaxStateMock = jest.fn();

        const negativeValue = -1;
        const positiveValue = 100;
        it.each`
            min                 | max               | expected 
            ${negativeValue}    | ${negativeValue}  | ${true} 
            ${negativeValue}    | ${positiveValue}  | ${true}
            ${positiveValue}    | ${negativeValue}  | ${true}
            ${positiveValue}    | ${positiveValue}  | ${false}  //same value
            ${1000}             | ${500}            | ${true}
            ${500}              | ${1000}           | ${false}
        `('returns $expected when $min and $max are provided', ({ min, max, expected }) => {
            expect(validateMinMaxFilter(min, max, setMinStateMock, setMaxStateMock)).toBe(expected);
        })
    });

    describe('validateCheckbox', () => {
        it('should return false when checkbox is checked', () => {
            // expect result
            const expectedResult = false;

            // given
            const checked = true;
            const setState = jest.fn();
            // when
            const output = validateCheckbox(checked, setState);

            // then
            expect(output).toBe(expectedResult);
        });
        it('should return true when checkbox is not checked', () => {
            // expect result
            const expectedResult = true;

            // given
            const checked = false;
            const setState = jest.fn();
            // when
            const output = validateCheckbox(checked, setState);

            // then
            expect(output).toBe(expectedResult);
        });
    });

    describe('validateCheckbox', () => {
        it('should return false when checkbox is checked', () => {
            // expect result
            const expectedResult = false;

            // given
            const checked = true;
            const setState = jest.fn();
            // when
            const output = validateCheckbox(checked, setState);

            // then
            expect(output).toBe(expectedResult);
        });
        it('should return true when checkbox is not checked', () => {
            // expect result
            const expectedResult = true;

            // given
            const checked = false;
            const setState = jest.fn();
            // when
            const output = validateCheckbox(checked, setState);

            // then
            expect(output).toBe(expectedResult);
        });
    });
    describe('validatePostalCode', () => {
        it('should return true when postalCode is empty', () => {
            // given
            const postalCode = "";
            const setStateVar = jest.fn();

            // when
            const result = validatePostalCode(postalCode, setStateVar);

            // then
            expect(result).toBe(true);
        });
        it('should return true when postalCode is not a postal Code', () => {
            // given
            const postalCode = "HelloWorld";
            const setStateVar = jest.fn();

            // when
            const result = validatePostalCode(postalCode, setStateVar);

            // then
            expect(result).toBe(true);
        });
        it('should return true when postalCode is leading with Z', () => {
            // given
            const postalCode = "Z3T 1B8";
            const setStateVar = jest.fn();

            // when
            const result = validatePostalCode(postalCode, setStateVar);

            // then
            expect(result).toBe(true);
        });
        it('should return true when postalCode is leading with W', () => {
            // given
            const postalCode = "W3T 1B8";
            const setStateVar = jest.fn();

            // when
            const result = validatePostalCode(postalCode, setStateVar);

            // then
            expect(result).toBe(true);
        });
        it('should return true when postalCode contains O', () => {
            // given
            const postalCode = "Z3T 1O8";
            const setStateVar = jest.fn();

            // when
            const result = validatePostalCode(postalCode, setStateVar);

            // then
            expect(result).toBe(true);
        });
        it('should return true when postalCode contains U', () => {
            // given
            const postalCode = "U3T 1O8";
            const setStateVar = jest.fn();

            // when
            const result = validatePostalCode(postalCode, setStateVar);

            // then
            expect(result).toBe(true);
        });
        it('should return true when postalCode is invalid format L#L #L#', () => {
            // given
            const postalCode = "2Z2 1B8";
            const setStateVar = jest.fn();

            // when
            const result = validatePostalCode(postalCode, setStateVar);

            // then
            expect(result).toBe(true);
        });
        it('should return true when postalCode is invalid format L#L #L#', () => {
            // given
            const postalCode = "2Z2 ABC";
            const setStateVar = jest.fn();

            // when
            const result = validatePostalCode(postalCode, setStateVar);

            // then
            expect(result).toBe(true);
        });
        it('should return false when postalCode is valid in XXX XXX format and uppercase', () => {
            // given
            const postalCode = "T3T 1B8";
            const setStateVar = jest.fn();

            // when
            const result = validatePostalCode(postalCode, setStateVar);

            // then
            expect(result).toBe(false);
        });
        it('should return false when postalCode is valid in XXX-XXX format and uppercase', () => {
            // given
            const postalCode = "T3T-1B8";
            const setStateVar = jest.fn();

            // when
            const result = validatePostalCode(postalCode, setStateVar);

            // then
            expect(result).toBe(false);
        });
        it('should return false when postalCode is valid in XXXXXX format and uppercase', () => {
            // given
            const postalCode = "T3T1B8";
            const setStateVar = jest.fn();

            // when
            const result = validatePostalCode(postalCode, setStateVar);

            // then
            expect(result).toBe(false);
        });
        it('should return false when postalCode is valid in XXX XXX format and lowercase', () => {
            // given
            const postalCode = "h2z 1b8";
            const setStateVar = jest.fn();

            // when
            const result = validatePostalCode(postalCode, setStateVar);

            // then
            expect(result).toBe(false);
        });
        it('should return false when postalCode is valid in XXX-XXX format and lowercase', () => {
            // given
            const postalCode = "h2t-1b8";
            const setStateVar = jest.fn();

            // when
            const result = validatePostalCode(postalCode, setStateVar);

            // then
            expect(result).toBe(false);
        });
        it('should return false when postalCode is valid in XXXXXX format and lowercase', () => {
            // given
            const postalCode = "h2z1b8";
            const setStateVar = jest.fn();

            // when
            const result = validatePostalCode(postalCode, setStateVar);

            // then
            expect(result).toBe(false);
        });
    });
});
