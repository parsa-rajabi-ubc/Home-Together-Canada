/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.16
 *
 * @Description: tests for userControllerValidatorUtils functions
 *
 */

const userControllerValidatorUtils = require('../userControllerValidatorUtils');

describe('userControllerValidatorUtils', () => {

    describe('isValidPassword', () => {
       it('should throw an error if password does not contain a number', () => {
           // given
           const password = 'Password';

           // then
           expect(() => userControllerValidatorUtils.isValidPassword(password))
               .toThrowError('Password must contain 8 characters, and at least one number, lower and upper case ' +
                   'letter');
       });
        it('should throw an error if password does not contain a lowercase letter', () => {
            // given
            const password = 'PASSWORD123';

            // then
            expect(() => userControllerValidatorUtils.isValidPassword(password))
                .toThrowError('Password must contain 8 characters, and at least one number, lower and upper case ' +
                    'letter');
        });
        it('should throw an error if password does not contain an uppercase letter', () => {
            // given
            const password = 'password123';

            // then
            expect(() => userControllerValidatorUtils.isValidPassword(password))
                .toThrowError('Password must contain 8 characters, and at least one number, lower and upper case ' +
                    'letter');
        });
        it('should throw an error if password contains less than 8 characters', () => {
            // given
            const password = 'AbC123';

            // then
            expect(() => userControllerValidatorUtils.isValidPassword(password))
                .toThrowError('Password must contain 8 characters, and at least one number, lower and upper case ' +
                    'letter');
        });
        it('should return true if password is at least characters long and contains a number, lowercase and ' +
            'upper case letter', () => {
                // given
                const password = 'Password123';

                // then
                expect(userControllerValidatorUtils.isValidPassword(password)).toBe(true);
        });
    });

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

    describe('validateMailingPostalCode', () => {
        it('should return true if hasDifferentMailingAddress is true and a valid postal code is provided', () => {
            // given
            const req = {
                body: {
                    hasDifferentMailingAddress: true
                }
            };
            const postalCode = "T1V1S4";

            // when
            const result = userControllerValidatorUtils.validateMailingPostalCode(postalCode, req);

            // then
            expect(result).toBe(true)
        });
        it('should return true if hasDifferentMailingAddress is false', () => {
            // given
            const req = {
                body: {
                    hasDifferentMailingAddress: false
                }
            };
            const postalCode = "T1V1S4";

            // when
            const result = userControllerValidatorUtils.validateMailingPostalCode(postalCode, req);

            // then
            expect(result).toBe(true)
        });
        it('should throw an error if hasDifferentMailingAddress is true and an invalid postal code is provided', () => {
            // given
            const req = {
                body: {
                    hasDifferentMailingAddress: true
                }
            };
            const postalCode = "1111";

            // then
            expect(() => userControllerValidatorUtils.validateMailingPostalCode(postalCode, req))
                .toThrowError('A valid postal code for the mailing address must be provided')
        });
    });

    describe('validateMailingProvince', () => {
        it('should return true if hasDifferentMailingAddress is true and a valid province is provided', () => {
            // given
            const req = {
                body: {
                    hasDifferentMailingAddress: true
                }
            };
            const province = "AB";

            // when
            const result = userControllerValidatorUtils.validateMailingProvince(province, req);

            // then
            expect(result).toBe(true)
        });
        it('should return true if hasDifferentMailingAddress is false', () => {
            // given
            const req = {
                body: {
                    hasDifferentMailingAddress: false
                }
            };
            const province = "AB";

            // when
            const result = userControllerValidatorUtils.validateMailingProvince(province, req);

            // then
            expect(result).toBe(true)
        });
        it('should throw an error if hasDifferentMailingAddress is true and an invalid province is provided', () => {
            // given
            const req = {
                body: {
                    hasDifferentMailingAddress: true
                }
            };
            const province = "ABA";

            // then
            expect(() => userControllerValidatorUtils.validateMailingProvince(province, req))
                .toThrowError('Mailing province is incorrect')
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
            expect(() => userControllerValidatorUtils.shouldMapAddressBeDefined(undefined, mockRequest))
                .toThrowError('Address must be defined');
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

    describe('validateMapPostalCode', () => {
        it('should return true if isNationWide is true and a valid postal code is provided', () => {
            // given
            const req = {
                body: {
                    isNationWide: true
                }
            };
            const postalCode = "T1V1S4";

            // when
            const result = userControllerValidatorUtils.validateMapPostalCode(postalCode, req);

            // then
            expect(result).toBe(true)
        });
        it('should return true if isNationWide is false and valid postal code is provided', () => {
            // given
            const req = {
                body: {
                    isNationWide: false
                }
            };
            const postalCode = "T1V1S4";

            // when
            const result = userControllerValidatorUtils.validateMapPostalCode(postalCode, req);

            // then
            expect(result).toBe(true)
        });
        it('should throw an error if isNationWide is false and an invalid postal code is provided', () => {
            // given
            const req = {
                body: {
                    hasDifferentMailingAddress: true
                }
            };
            const postalCode = "1111";

            // then
            expect(() => userControllerValidatorUtils.validateMapPostalCode(postalCode, req))
                .toThrowError('A valid postal code for the searchable address must be provided')
        });
    });

    describe('validateMapProvince', () => {
        it('should return true if isNationWide is true and a valid province is provided', () => {
            // given
            const req = {
                body: {
                    isNationWide: true
                }
            };
            const province = "AB";

            // when
            const result = userControllerValidatorUtils.validateMapProvince(province, req);

            // then
            expect(result).toBe(true)
        });
        it('should return true if isNationWide is false and valid province is provided', () => {
            // given
            const req = {
                body: {
                    isNationWide: false
                }
            };
            const province = "AB";

            // when
            const result = userControllerValidatorUtils.validateMapProvince(province, req);

            // then
            expect(result).toBe(true)
        });
        it('should throw an error if isNationWide is false and an invalid province is provided', () => {
            // given
            const req = {
                body: {
                    isNationWide: false
                }
            };
            const province = "ABA";

            // then
            expect(() => userControllerValidatorUtils.validateMapProvince(province, req))
                .toThrowError('Searchable address province is incorrect')
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
            expect(() => userControllerValidatorUtils.shouldIncorporatedOwnersNamesBeDefined(incorporatedOwnersNames, mockRequest))
                .toThrowError('Incorporated owners\' names must be defined');
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

    describe('isPositiveInteger', () => {
        it('should return true if number is positive', () => {
            // given
            const num = 100;

            // when
            const result = userControllerValidatorUtils.isPositiveInteger(num);

            // then
            expect(result).toBe(true);
        });
        it('should return true if number is 0', () => {
            // given
            const num = 0;

            // when
            const result = userControllerValidatorUtils.isPositiveInteger(num);

            // then
            expect(result).toBe(true);

        });
        it('should throw an error if number is negative', () => {
            // given
            const num = -100;

            // then
            expect(() => userControllerValidatorUtils.isPositiveInteger(num))
                .toThrowError('Must provide a positive value');
        });
        it('should throw an error if number is null', () => {
            // given
            const num = null;

            // then
            expect(() => userControllerValidatorUtils.isPositiveInteger(num))
                .toThrowError('Must provide a positive value');
        });
        it('should throw an error if number is undefined', () => {
            // given
            const num = undefined;

            // then
            expect(() => userControllerValidatorUtils.isPositiveInteger(num))
                .toThrowError('Must provide a positive value');
        });
    });

    describe('validMinAndMax', () => {
        it('should return true if min is less than max', () => {
            // given
            const min = 80;
            const max = 200;

            // when
            const result = userControllerValidatorUtils.validateMinAndMax(min, max);

            // then
            expect(result).toBe(true);
        });
        it('should return true if min is equal to max', () => {
            // given
            const min = 50;
            const max = 50;

            // when
            const result = userControllerValidatorUtils.validateMinAndMax(min, max);

            // then
            expect(result).toBe(true);
        });
        it('should throw an error if min is greater than max', () => {
            // given
            const min = 100;
            const max = 50;

            // then
            expect(() => userControllerValidatorUtils.validateMinAndMax(min, max))
                .toThrowError('Min is greater than the max');
        });
        it('should throw an error if min is null', () => {
            // given
            const min = null;
            const max = 50;

            // then
            expect(() => userControllerValidatorUtils.validateMinAndMax(min, max))
                .toThrowError('Min is greater than the max');
        });
        it('should throw an error if min is undefined', () => {
            // given
            const min = undefined;
            const max = 50;

            // then
            expect(() => userControllerValidatorUtils.validateMinAndMax(min, max))
                .toThrowError('Min is greater than the max');
        });
        it('should throw an error if max is null', () => {
            // given
            const min = 50;
            const max = null;

            // then
            expect(() => userControllerValidatorUtils.validateMinAndMax(min, max))
                .toThrowError('Min is greater than the max');
        });
        it('should throw an error if max is undefined', () => {
            // given
            const min = 50;
            const max = undefined;

            // then
            expect(() => userControllerValidatorUtils.validateMinAndMax(min, max))
                .toThrowError('Min is greater than the max');
        });
    });

    describe('validStatusPreferences', () => {
        it('should return true if all items in the array are valid statuses', () => {
            // given
            const statuses = ['Single', 'Couple', 'Single Parent'];

            // when
            const result = userControllerValidatorUtils.validStatusPreferences(statuses);

            // then
            expect(result).toBe(true);
        });
        it('should throw an error if there is at least one invalid status', () => {
            // given
            const statuses = ['Single', 'INVALID', 'Single Parent'];

            // then
            expect(() => userControllerValidatorUtils.validStatusPreferences(statuses))
                .toThrowError('Status is not included valid statuses');
        });
        it('should throw an error if the array is empty', () => {
            // given
            const statuses = [];

            // then
            expect(() => userControllerValidatorUtils.validStatusPreferences(statuses))
                .toThrowError('Status list is empty');
        });
        it('should throw an error if the array is undefined', () => {
            // given
            const statuses = undefined;

            // then
            expect(() => userControllerValidatorUtils.validStatusPreferences(statuses))
                .toThrowError('Status list is empty');
        });
        it('should throw an error if the array is null', () => {
            // given
            const statuses = undefined;

            // then
            expect(() => userControllerValidatorUtils.validStatusPreferences(statuses))
                .toThrowError('Status list is empty');
        });
    });

    describe('validGenderPreferences', () => {
        it('should return true if all items in the array are valid genders', () => {
            // given
            const genders = ['Female', 'Male', 'Other'];

            // when
            const result = userControllerValidatorUtils.validGenderPreferences(genders);

            // then
            expect(result).toBe(true);
        });
        it('should throw an error if there is at least one invalid gender', () => {
            // given
            const genders = ['Female', 'INVALID', 'Other'];

            // then
            expect(() => userControllerValidatorUtils.validGenderPreferences(genders))
                .toThrowError('Gender is not included in valid genders');
        });
        it('should throw an error if the array is empty', () => {
            // given
            const genders = [];

            // then
            expect(() => userControllerValidatorUtils.validGenderPreferences(genders))
                .toThrowError('Gender preferences list is empty');
        });
        it('should throw an error if the array is undefined', () => {
            // given
            const genders = undefined;

            // then
            expect(() => userControllerValidatorUtils.validGenderPreferences(genders))
                .toThrowError('Gender preferences list is empty');
        });
        it('should throw an error if the array is null', () => {
            // given
            const genders = undefined;

            // then
            expect(() => userControllerValidatorUtils.validGenderPreferences(genders))
                .toThrowError('Gender preferences list is empty');
        });
    });

    describe('isValidShareLimit', () => {
        it('should return true if limit is included in SHARE_LIMITS', () => {
            // given
            const limit = 3;

            // when
            const result = userControllerValidatorUtils.isValidShareLimit(limit);

            // then
            expect(result).toBe(true);
        });
        it('should return false if limit is not included in SHARE_LIMITS', () => {
            // given
            const limit = 999;

            // when
            const result = userControllerValidatorUtils.isValidShareLimit(limit);

            // then
            expect(result).toBe(false);
        });
        it('should return false if limit is null', () => {
            // given
            const limit = null;

            // when
            const result = userControllerValidatorUtils.isValidShareLimit(limit);

            // then
            expect(result).toBe(false);
        });
        it('should return false if limit is undefined', () => {
            // given
            const limit = undefined;

            // when
            const result = userControllerValidatorUtils.isValidShareLimit(limit);

            // then
            expect(result).toBe(false);
        });
    });

    describe('isValidAreasOfInterestList', () => {
        it('should return true if one valid area of interest is provided', () => {
            // given
            const areasOfInterest = [{ province: 'AB', city: 'Calgary', radius: 50 }];

            // when
            const result = userControllerValidatorUtils.isValidAreasOfInterestList(areasOfInterest);

            // then
            expect(result).toBe(true);
        });
        it('should return true if multiple valid area of interest are provided', () => {
            // given
            const areasOfInterest = [
                { province: 'AB', city: 'Calgary', radius: 50 },
                { province: 'BC', city: 'Kelowna', radius: 100 },
                { province: 'MB', city: 'Churchill', radius: 25 }
            ];

            // when
            const result = userControllerValidatorUtils.isValidAreasOfInterestList(areasOfInterest);

            // then
            expect(result).toBe(true);
        });
        it('should throw an error if a province is undefined in an area of interest', () => {
            // given
            const areasOfInterest = [{ province: undefined, city: 'Calgary', radius: 50 }];

            // then
            expect(() => userControllerValidatorUtils.isValidAreasOfInterestList(areasOfInterest))
                .toThrowError('Area of interest must include province, city and radius properties');
        });
        it('should throw an error if a province is null in an area of interest', () => {
            // given
            const areasOfInterest = [{ province: null, city: 'Calgary', radius: 50 }];

            // then
            expect(() => userControllerValidatorUtils.isValidAreasOfInterestList(areasOfInterest))
                .toThrowError('Area of interest must include province, city and radius properties');
        });
        it('should throw an error if a city is undefined in an area of interest', () => {
            // given
            const areasOfInterest = [{ province: 'AB', city: undefined, radius: 50 }];

            // then
            expect(() => userControllerValidatorUtils.isValidAreasOfInterestList(areasOfInterest))
                .toThrowError('Area of interest must include province, city and radius properties');
        });
        it('should throw an error if a city is null in an area of interest', () => {
            // given
            const areasOfInterest = [{ province: 'AB', city: null, radius: 50 }];

            // then
            expect(() => userControllerValidatorUtils.isValidAreasOfInterestList(areasOfInterest))
                .toThrowError('Area of interest must include province, city and radius properties');
        });
        it('should throw an error if a radius is undefined in an area of interest', () => {
            // given
            const areasOfInterest = [{ province: 'AB', city: 'Calgary', radius: undefined }];

            // then
            expect(() => userControllerValidatorUtils.isValidAreasOfInterestList(areasOfInterest))
                .toThrowError('Area of interest must include province, city and radius properties');
        });
        it('should throw an error if a radius is null in an area of interest', () => {
            // given
            const areasOfInterest = [{ province: 'AB', city: 'Calgary', radius: null }];

            // then
            expect(() => userControllerValidatorUtils.isValidAreasOfInterestList(areasOfInterest))
                .toThrowError('Area of interest must include province, city and radius properties');
        });
        it('should throw an error if an invalid province in an area of interest', () => {
            // given
            const areasOfInterest = [{ province: 'NOT A VALID PROVINCE', city: 'Calgary', radius: 25 }];

            // then
            expect(() => userControllerValidatorUtils.isValidAreasOfInterestList(areasOfInterest))
                .toThrowError('Must provide a valid Canadian Province');
        });
        it('should throw an error if a radius is less than 0 in an area of interest', () => {
            // given
            const areasOfInterest = [{ province: 'AB', city: 'Calgary', radius: -25 }];

            // then
            expect(() => userControllerValidatorUtils.isValidAreasOfInterestList(areasOfInterest))
                .toThrowError('Radius must be positive');
        });
        it('should throw an error if areasOfInterest is empty', () => {
            // given
            const areasOfInterest = [];

            // then
            expect(() => userControllerValidatorUtils.isValidAreasOfInterestList(areasOfInterest))
                .toThrowError('At least one area of interest must be provided');
        });
        it('should throw an error if areasOfInterest is undefined', () => {
            // given
            const areasOfInterest = undefined;

            // then
            expect(() => userControllerValidatorUtils.isValidAreasOfInterestList(areasOfInterest))
                .toThrowError('At least one area of interest must be provided');
        });
        it('should throw an error if areasOfInterest is null', () => {
            // given
            const areasOfInterest = null;

            // then
            expect(() => userControllerValidatorUtils.isValidAreasOfInterestList(areasOfInterest))
                .toThrowError('At least one area of interest must be provided');
        });
    });
});
