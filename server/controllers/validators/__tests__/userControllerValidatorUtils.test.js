/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.16
 *
 * @Description: tests for userControllerValidatorUtils functions
 *
 */

const userControllerValidatorUtils = require('../userControllerValidatorUtils');

describe('userControllerValidatorUtils', () => {

    describe('isValidPhoneNumber', () => {
        it('should throw an error if phoneNum is not 10 digits long', () => {
            // given
            const phoneNum = 123456789123456789;

            // then
            expect(() => userControllerValidatorUtils.isValidPhoneNumber(phoneNum)).toThrowError('Phone number must be 10 digits long');
        });
        it('should return true if phoneNum is 10 digits long', () => {
            // given
            const phoneNum = 1234567890;

            // when
            const result = userControllerValidatorUtils.isValidPhoneNumber(phoneNum);

            // then
            expect(result).toBe(true);
        })
    });

    describe('isValidCanadianPostalCode', () => {
        it('should throw an error if the postal code is invalid', () => {
            // given
            const postalCode = "5X53W3";

            // then
            expect(() => userControllerValidatorUtils.isValidCanadianPostalCode(postalCode))
                .toThrowError('Invalid postal code');
        });
        it('should return true if the postal code is valid and contains no hyphen', () => {
            // given
            const postalCode = "T1V1S4";

            // when
            const result = userControllerValidatorUtils.isValidCanadianPostalCode(postalCode);

            // then
            expect(result).toBe(true);
        });
        it('should return true if the postal code is valid and contains a hyphen', () => {
            // given
            const postalCode = "T1V-1S4";

            // when
            const result = userControllerValidatorUtils.isValidCanadianPostalCode(postalCode);

            // then
            expect(result).toBe(true);
        });
    });

    describe('shouldMailingAddressBeDefined', () => {
        it('should throw an error if the mailing address component is undefined and hasDifferentMailingAddress is true', () => {
            // given
            const mockRequest = {
                body: {
                    hasDifferentMailingAddress: true
                }
            };

            // then
            expect(() => userControllerValidatorUtils.shouldMailingAddressBeDefined(undefined, mockRequest));
        });

        it('should return true if the mailing address component is defined and hasDifferentMailingAddress is true', () => {
            // given
            const mockRequest = {
                body: {
                    hasDifferentMailingAddress: true
                }
            };
            const addressPart = "1 Oak Street";

            // when
            const result = userControllerValidatorUtils.shouldMailingAddressBeDefined(addressPart, mockRequest);

            // then
            expect(result).toBe(true);
        });

        it('should return true if the mailing address component is defined and hasDifferentMailingAddress is false', () => {
            // given
            const mockRequest = {
                body: {
                    hasDifferentMailingAddress: false
                }
            };
            const addressPart = "1 Oak Street";

            // when
            const result = userControllerValidatorUtils.shouldMailingAddressBeDefined(addressPart, mockRequest);

            // then
            expect(result).toBe(true);
        });

        it('should return true if the mailing address component is undefined and hasDifferentMailingAddress is false', () => {
            // given
            const mockRequest = {
                body: {
                    hasDifferentMailingAddress: false
                }
            };
            const addressPart = undefined;

            // when
            const result = userControllerValidatorUtils.shouldMailingAddressBeDefined(addressPart, mockRequest);

            // then
            expect(result).toBe(true);
        });
    });

    describe('shouldMapAddressBeDefined', () => {
        it('should throw an error if the address component is undefined and isNationWide is false', () => {
            // given
            const mockRequest = {
                body: {
                    isNationWide: false
                }
            };

            // then
            expect(() => userControllerValidatorUtils.shouldMapAddressBeDefined(undefined, mockRequest));
        });

        it('should return true if the address component is defined and isNationWide is false', () => {
            // given
            const mockRequest = {
                body: {
                    isNationWide: false
                }
            };
            const addressPart = "1 Oak Street";

            // when
            const result = userControllerValidatorUtils.shouldMapAddressBeDefined(addressPart, mockRequest);

            // then
            expect(result).toBe(true);
        });

        it('should return true if the address component is defined and isNationWide is true', () => {
            // given
            const mockRequest = {
                body: {
                    isNationWide: true
                }
            };
            const addressPart = "1 Oak Street";

            // when
            const result = userControllerValidatorUtils.shouldMapAddressBeDefined(addressPart, mockRequest);

            // then
            expect(result).toBe(true);
        });

        it('should return true if the address component is undefined and isNationWide is false', () => {
            // given
            const mockRequest = {
                body: {
                    isNationWide: true
                }
            };
            const addressPart = undefined;

            // when
            const result = userControllerValidatorUtils.shouldMapAddressBeDefined(addressPart, mockRequest);

            // then
            expect(result).toBe(true);
        });
    });

    describe('shouldIncorporatedOwnersNamesBeDefined', () => {
        it('should throw an error if incorporatedOwnersNames is undefined and isIncorporated is true', () => {
            // given
            const mockRequest = {
                body: {
                    isIncorporated: true
                }
            };
            const incorporatedOwnersNames = undefined;

            // then
            expect(() => userControllerValidatorUtils.shouldIncorporatedOwnersNamesBeDefined(incorporatedOwnersNames, mockRequest));
        });

        it('should return true if incorporatedOwnersNames is defined and isIncorporated is true', () => {
            // given
            const mockRequest = {
                body: {
                    isIncorporated: true
                }
            };
            const incorporatedOwnersNames = "Jane Doe";

            // when
            const result = userControllerValidatorUtils.shouldIncorporatedOwnersNamesBeDefined(incorporatedOwnersNames, mockRequest);

            // then
            expect(result).toBe(true);
        });

        it('should return true if incorporatedOwnersNames is undefined and isIncorporated is false', () => {
            // given
            const mockRequest = {
                body: {
                    isIncorporated: false
                }
            };
            const incorporatedOwnersNames = "Jane Doe";

            // when
            const result = userControllerValidatorUtils.shouldIncorporatedOwnersNamesBeDefined(incorporatedOwnersNames, mockRequest);

            // then
            expect(result).toBe(true);
        });

        it('should return true if incorporatedOwnersNames is undefined and isIncorporated is false', () => {
            // given
            const mockRequest = {
                body: {
                    isIncorporated: false
                }
            };
            const incorporatedOwnersNames = undefined;

            // when
            const result = userControllerValidatorUtils.shouldIncorporatedOwnersNamesBeDefined(incorporatedOwnersNames, mockRequest);

            // then
            expect(result).toBe(true);
        });
    });
});