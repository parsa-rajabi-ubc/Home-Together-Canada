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

    describe('getProfileInformation', () => {


        it('should return an empty array if results is an empty array', () => {
            // expected results
            const expected = [];

            // given
            const results = [];

            // when
            const profiles = accountControllerUtils.getProfileInformation(results);

            // then
            expect(profiles).toEqual(expected);
        });
        it('should return an empty array if results is undefined', () => {
            // expected results
            const expected = [];

            // given
            const results = undefined;

            // when
            const profiles = accountControllerUtils.getProfileInformation(results);

            // then
            expect(profiles).toEqual(expected);
        });
        it('should return an empty array if results is null', () => {
            // expected results
            const expected = [];

            // given
            const results = null;

            // when
            const profiles = accountControllerUtils.getProfileInformation(results);

            // then
            expect(profiles).toEqual(expected);
        });
        it('should return a list of profiles', () => {
            // expected results
            const expectedResult = [
                {
                    uid: 2,
                    username: 'member2',
                    gender: 'Male',
                    genderDescription: null,
                    birthYear: 2000,
                    status: 'Single',
                    minMonthlyBudget: 400,
                    maxMonthlyBudget: 700,
                    numRoommates: 2,
                    workStatus: 'Student',
                    bio: null,
                    hasHomeToShare: false,
                    hasHomeToShareDescription: undefined,
                    isReligionImportant: true,
                    religionDescription: null,
                    isDietImportant: false,
                    dietDescription: null,
                    hasHealthMobilityIssues: false,
                    healthMobilityIssuesDescription: null,
                    hasAllergies: false,
                    allergiesDescription: null,
                    hasPets: true,
                    petsDescription: null,
                    isSmoker: false,
                    smokingDescription: null
                },
                {
                    uid: 3,
                    username: 'member3',
                    gender: 'Female',
                    genderDescription: null,
                    birthYear: 1999,
                    status: 'Couple',
                    minMonthlyBudget: 200,
                    maxMonthlyBudget: 800,
                    numRoommates: 1,
                    workStatus: 'Student',
                    bio: null,
                    hasHomeToShare: false,
                    hasHomeToShareDescription: undefined,
                    isReligionImportant: true,
                    religionDescription: null,
                    isDietImportant: false,
                    dietDescription: null,
                    hasHealthMobilityIssues: false,
                    healthMobilityIssuesDescription: null,
                    hasAllergies: false,
                    allergiesDescription: null,
                    hasPets: true,
                    petsDescription: null,
                    isSmoker: false,
                    smokingDescription: null
                }
            ];

            // given
            const results = [
                    {
                        dataValues: {
                            uid: 2,
                            isAdmin: false,
                            gender: 'Male',
                            genderDescription: null,
                            birthYear: 2000,
                            status: 'Single',
                            minMonthlyBudget: 400,
                            maxMonthlyBudget: 700,
                            hasHomeToShare: false,
                            homeToShareDescription: null,
                            isReligionImportant: true,
                            religionDescription: null,
                            isDietImportant: false,
                            dietDescription: null,
                            hasHealthMobilityIssues: false,
                            healthMobilityIssuesDescription: null,
                            hasAllergies: false,
                            allergiesDescription: null,
                            hasPets: true,
                            petsDescription: null,
                            isSmoker: false,
                            smokingDescription: null,
                            numRoommates: 2,
                            workStatus: 'Student',
                            bio: null,
                            minAgePreference: 18,
                            maxAgePreference: 25,
                            statusPreference: '["Single","Couple"]',
                            numRoommatesPreference: '[1,3]',
                            minBudgetPreference: 500,
                            maxBudgetPreference: 1000,
                            dietPreference: false,
                            petsPreference: true,
                            smokingPreference: false,
                            genderPreference: '["Female","Male"]',
                            religionPreference: true,
                            othersWithHomeToSharePreference: false,
                            createdAt: '2021-01-21T20:58:31.000Z',
                            updatedAt: '2021-01-21T20:58:31.000Z',
                            AbstractUser: {
                                dataValues: { username: 'member2' },
                            },
                        },
                    },
                    {
                        dataValues: {
                            uid: 3,
                            isAdmin: false,
                            gender: 'Female',
                            genderDescription: null,
                            birthYear: 1999,
                            status: 'Couple',
                            minMonthlyBudget: 200,
                            maxMonthlyBudget: 800,
                            hasHomeToShare: false,
                            homeToShareDescription: null,
                            isReligionImportant: true,
                            religionDescription: null,
                            isDietImportant: false,
                            dietDescription: null,
                            hasHealthMobilityIssues: false,
                            healthMobilityIssuesDescription: null,
                            hasAllergies: false,
                            allergiesDescription: null,
                            hasPets: true,
                            petsDescription: null,
                            isSmoker: false,
                            smokingDescription: null,
                            numRoommates: 1,
                            workStatus: 'Student',
                            bio: null,
                            minAgePreference: 18,
                            maxAgePreference: 25,
                            statusPreference: '["Single","Couple"]',
                            numRoommatesPreference: '[1,3]',
                            minBudgetPreference: 500,
                            maxBudgetPreference: 1000,
                            dietPreference: false,
                            petsPreference: true,
                            smokingPreference: false,
                            genderPreference: '["Female","Male"]',
                            religionPreference: true,
                            othersWithHomeToSharePreference: false,
                            createdAt: '2021-01-21T20:58:41.000Z',
                            updatedAt: '2021-01-21T20:58:41.000Z',
                            AbstractUser: {
                                dataValues: { username: 'member3' },
                            }
                    }
                }
            ];

            // when
            const profilesList = accountControllerUtils.getProfileInformation(results);

            // then
            expect(profilesList).toEqual(expectedResult);
        });
    });
});
