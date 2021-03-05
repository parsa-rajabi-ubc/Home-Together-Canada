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

    describe('getValueOfOptionalField', () => {
        it.each`
            flag    | optionalField | expected
            ${true} | ${1}          | ${1}
            ${true} | ${undefined}  | ${undefined}
            ${false}| ${1}          | ${null}
            ${false}| ${undefined}  | ${null}
        `('returns $expected when $flag and optionalField are provided',
            ({ flag, optionalField, expected }) => {
                expect(accountControllerUtils.getValueOfOptionalField(flag, optionalField)).toEqual(expected)
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

    describe('getFilteredProfilesInformation', () => {
        it('should return an empty array if results is an empty array', () => {
            // expected results
            const expected = [];

            // given
            const results = [];

            // when
            const profiles = accountControllerUtils.getFilteredProfilesInformation(results);

            // then
            expect(profiles).toEqual(expected);
        });
        it('should return an empty array if results is undefined', () => {
            // expected results
            const expected = [];

            // given
            const results = undefined;

            // when
            const profiles = accountControllerUtils.getFilteredProfilesInformation(results);

            // then
            expect(profiles).toEqual(expected);
        });
        it('should return an empty array if results is null', () => {
            // expected results
            const expected = [];

            // given
            const results = null;

            // when
            const profiles = accountControllerUtils.getFilteredProfilesInformation(results);

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
                    isInterestedInBuyingHome: undefined,
                    interestInBuyingHomeDescription: undefined,
                    areasOfInterest: [
                        {
                            city: "Calgary",
                            province: "AB",
                            radius: 80
                       },
                    ],
                    roommates: undefined,
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
                    isInterestedInBuyingHome: undefined,
                    interestInBuyingHomeDescription: undefined,
                    areasOfInterest: [
                        {
                            city: "High River",
                            province: "AB",
                            radius: 75
                        },
                        {
                            city: "High River",
                            province: "AB",
                            radius: 50
                        },
                    ],
                    roommates: ["member2"]
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
                            AreaOfInterests: [
                                {
                                    dataValues: {
                                        id: 1,
                                        uid: 1,
                                        province: 'AB',
                                        city: 'Calgary',
                                        radius: 80,
                                        latitude: 51.0534234,
                                        longitude: -114.0625892,
                                        feature: '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[51.0534234,-66.83673116372454],[51.621310042081625,-66.80746301903781],[52.14973442383986,-66.72169864724444],[52.60275541341913,-66.58537361676682],[52.95093140812846,-66.40779478722814],[53.1733676755523,-66.20085642258816],[53.25868503458103,-65.97810412495558],[53.20499464999962,-65.75375522691738],[53.01911662332994,-65.54176502127673],[52.71533139305123,-65.3549993692935],[52.313922495104414,-65.20454588350191],[51.83969481416719,-65.09917417090193],[51.32056864323862,-65.0449424665402],[50.78627815676139,-65.0449424665402],[50.267151985832825,-65.09917417090193],[49.79292430489559,-65.20454588350191],[49.39151540694877,-65.3549993692935],[49.08773017667006,-65.54176502127673],[48.90185215000039,-65.75375522691736],[48.84816176541897,-65.97810412495558],[48.9334791244477,-66.20085642258816],[49.15591539187154,-66.40779478722814],[49.50409138658087,-66.58537361676682],[49.95711237616015,-66.72169864724444],[50.48553675791838,-66.80746301903781],[51.0534234,-66.83673116372454]]]}}',
                                        createdAt: '2021-02-16T02:39:42.000Z',
                                        updatedAt: '2021-02-16T02:39:42.000Z'
                                    }
                                }
                            ],
                            Roommates: []
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
                            },
                            AreaOfInterests: [
                                {
                                    dataValues: {
                                        id: 3,
                                        uid: 3,
                                        province: 'AB',
                                        city: 'High River',
                                        radius: 75,
                                        latitude: 50.5797079,
                                        longitude: -113.8569213,
                                        feature: '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[50.5797079,-66.9974330455383],[51.122792305399415,-66.96966904651742],[51.62829384580017,-66.8883039219091],[52.06193998772039,-66.75894629505267],[52.395580513982495,-66.59039748189372],[52.60914125117448,-66.39391817371212],[52.691576771002474,-66.18234934703962],[52.64089130558096,-65.96918785384183],[52.463439757907786,-65.76770047471713],[52.172772322237904,-65.59013440623377],[51.78826273524207,-65.44705625861219],[51.33369464377994,-65.34683138430255],[50.835904338436514,-65.2952427253428],[50.3235114615635,-65.2952427253428],[49.82572115622008,-65.34683138430255],[49.37115306475796,-65.44705625861219],[48.98664347776211,-65.59013440623377],[48.695976042092234,-65.76770047471713],[48.518524494419054,-65.96918785384183],[48.46783902899754,-66.18234934703962],[48.55027454882553,-66.39391817371212],[48.76383528601752,-66.59039748189372],[49.097475812279626,-66.75894629505267],[49.53112195419984,-66.8883039219091],[50.03662349460061,-66.96966904651742],[50.5797079,-66.9974330455383]]]}}',
                                        createdAt: '2021-02-16T02:39:46.000Z',
                                        updatedAt: '2021-02-16T02:39:46.000Z'
                                    }
                                },
                                {
                                    dataValues: {
                                        id: 3,
                                        uid: 3,
                                        province: 'AB',
                                        city: 'High River',
                                        radius: 50,
                                        latitude: 50.5797079,
                                        longitude: -113.8569213,
                                        feature: '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[50.5797079,-66.9974330455383],[51.122792305399415,-66.96966904651742],[51.62829384580017,-66.8883039219091],[52.06193998772039,-66.75894629505267],[52.395580513982495,-66.59039748189372],[52.60914125117448,-66.39391817371212],[52.691576771002474,-66.18234934703962],[52.64089130558096,-65.96918785384183],[52.463439757907786,-65.76770047471713],[52.172772322237904,-65.59013440623377],[51.78826273524207,-65.44705625861219],[51.33369464377994,-65.34683138430255],[50.835904338436514,-65.2952427253428],[50.3235114615635,-65.2952427253428],[49.82572115622008,-65.34683138430255],[49.37115306475796,-65.44705625861219],[48.98664347776211,-65.59013440623377],[48.695976042092234,-65.76770047471713],[48.518524494419054,-65.96918785384183],[48.46783902899754,-66.18234934703962],[48.55027454882553,-66.39391817371212],[48.76383528601752,-66.59039748189372],[49.097475812279626,-66.75894629505267],[49.53112195419984,-66.8883039219091],[50.03662349460061,-66.96966904651742],[50.5797079,-66.9974330455383]]]}}',
                                        createdAt: '2021-02-16T02:39:46.000Z',
                                        updatedAt: '2021-02-16T02:39:46.000Z'
                                    }
                                }
                            ],
                            Roommates: [
                                {
                                    dataValues: {
                                        uid: 2,
                                        LivesWith: {
                                            dataValues: { RoommateUid: 2 }
                                        },
                                        AbstractUser: {
                                            dataValues: { username: 'member2' }
                                        }
                                    }
                                }
                            ]
                        }
                    }
            ];

            // when
            const profilesList = accountControllerUtils.getFilteredProfilesInformation(results);

            // then
            expect(profilesList).toEqual(expectedResult);
        });
    });
});
