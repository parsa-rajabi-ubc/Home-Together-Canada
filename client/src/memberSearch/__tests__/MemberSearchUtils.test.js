/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.15
 *
 * @Description: Utility file testing for functions limiting search result data
 *
 */

import {limitResults} from "../MemberSearchUtils";
import MockProfileCardData from "../../mockData/MockProfileCardData";


describe('isStringEmpty function', () => {
    describe('unit test', () => {
        it("should return correct array for given large data and small limit", () => {
            //given
            const data = MockProfileCardData;
            const limit = 5;
            const start = 0;
            //when
            const result = limitResults(data,limit,start);
            const expected = [
                {
                    username: "AliceinWonderLand",
                    gender: "Female",
                    birthYear: 1985,
                    status: "Single",
                    minMonthlyBudget: 200,
                    maxMonthlyBudget: 550,
                    hasPets: false,
                    isSmoker: false,
                    isReligionImportant: false,
                    isDietImportant: false,
                    hasHomeToShare: false
                },
                {
                    username: "Babar",
                    gender: "Male",
                    birthYear: 1990,
                    status: "Couple With Children",
                    minMonthlyBudget: 2000,
                    maxMonthlyBudget: 5500,
                    hasPets: true,
                    isSmoker: true,
                    isReligionImportant: true,
                    isDietImportant: true,
                    hasHomeToShare: true
                },
                {
                    username: "CREATINE",
                    gender: "Other",
                    birthYear: 1995,
                    status: "Single",
                    minMonthlyBudget: 800,
                    maxMonthlyBudget: 1200,
                    hasPets: false,
                    isSmoker: true,
                    isReligionImportant: true,
                    isDietImportant: true,
                    hasHomeToShare: true
                },
                {
                    username: "DonaldDuck",
                    gender: "Male",
                    birthYear: 1970,
                    status: "Single Parent",
                    minMonthlyBudget: 500,
                    maxMonthlyBudget: 600,
                    hasPets: false,
                    isSmoker: false,
                    isReligionImportant: true,
                    isDietImportant: true,
                    hasHomeToShare: true
                },
                {
                    username: "EusticeOfNarnia",
                    gender: "Male",
                    birthYear: 1950,
                    status: "Single",
                    minMonthlyBudget: 1300,
                    maxMonthlyBudget: 2300,
                    hasPets: false,
                    isSmoker: false,
                    isReligionImportant: false,
                    isDietImportant: true,
                    hasHomeToShare: false
                }
            ];
            //then
            expect(result).toStrictEqual(expected);
        });
        it("should return correct array for given equal data size and limit", () => {
            //given
            const data = [
                {
                    username: "AliceinWonderLand",
                    gender: "Female",
                    birthYear: 1985,
                    status: "Single",
                    minMonthlyBudget: 200,
                    maxMonthlyBudget: 550,
                    hasPets: false,
                    isSmoker: false,
                    isReligionImportant: false,
                    isDietImportant: false,
                    hasHomeToShare: false
                },
                {
                    username: "Babar",
                    gender: "Male",
                    birthYear: 1990,
                    status: "Couple With Children",
                    minMonthlyBudget: 2000,
                    maxMonthlyBudget: 5500,
                    hasPets: true,
                    isSmoker: true,
                    isReligionImportant: true,
                    isDietImportant: true,
                    hasHomeToShare: true
                },
                {
                    username: "CREATINE",
                    gender: "Other",
                    birthYear: 1995,
                    status: "Single",
                    minMonthlyBudget: 800,
                    maxMonthlyBudget: 1200,
                    hasPets: false,
                    isSmoker: true,
                    isReligionImportant: true,
                    isDietImportant: true,
                    hasHomeToShare: true
                }
            ];
            const limit = 3;
            const start = 0
            //when
            const result = limitResults(data,limit,start);
            const expected = [
                {
                    username: "AliceinWonderLand",
                    gender: "Female",
                    birthYear: 1985,
                    status: "Single",
                    minMonthlyBudget: 200,
                    maxMonthlyBudget: 550,
                    hasPets: false,
                    isSmoker: false,
                    isReligionImportant: false,
                    isDietImportant: false,
                    hasHomeToShare: false
                },
                {
                    username: "Babar",
                    gender: "Male",
                    birthYear: 1990,
                    status: "Couple With Children",
                    minMonthlyBudget: 2000,
                    maxMonthlyBudget: 5500,
                    hasPets: true,
                    isSmoker: true,
                    isReligionImportant: true,
                    isDietImportant: true,
                    hasHomeToShare: true
                },
                {
                    username: "CREATINE",
                    gender: "Other",
                    birthYear: 1995,
                    status: "Single",
                    minMonthlyBudget: 800,
                    maxMonthlyBudget: 1200,
                    hasPets: false,
                    isSmoker: true,
                    isReligionImportant: true,
                    isDietImportant: true,
                    hasHomeToShare: true
                }
            ];
            //then
            expect(result).toStrictEqual(expected);
        });
        it("should return array of size shorter than limit for given data<limit+start", () => {
            //given
            const data = [
                {
                    username: "AliceinWonderLand",
                    gender: "Female",
                    birthYear: 1985,
                    status: "Single",
                    minMonthlyBudget: 200,
                    maxMonthlyBudget: 550,
                    hasPets: false,
                    isSmoker: false,
                    isReligionImportant: false,
                    isDietImportant: false,
                    hasHomeToShare: false
                },
                {
                    username: "Babar",
                    gender: "Male",
                    birthYear: 1990,
                    status: "Couple With Children",
                    minMonthlyBudget: 2000,
                    maxMonthlyBudget: 5500,
                    hasPets: true,
                    isSmoker: true,
                    isReligionImportant: true,
                    isDietImportant: true,
                    hasHomeToShare: true
                },
                {
                    username: "CREATINE",
                    gender: "Other",
                    birthYear: 1995,
                    status: "Single",
                    minMonthlyBudget: 800,
                    maxMonthlyBudget: 1200,
                    hasPets: false,
                    isSmoker: true,
                    isReligionImportant: true,
                    isDietImportant: true,
                    hasHomeToShare: true
                },
                {
                    username: "DonaldDuck",
                    gender: "Male",
                    birthYear: 1970,
                    status: "Single Parent",
                    minMonthlyBudget: 500,
                    maxMonthlyBudget: 600,
                    hasPets: false,
                    isSmoker: false,
                    isReligionImportant: true,
                    isDietImportant: true,
                    hasHomeToShare: true
                },
                {
                    username: "EusticeOfNarnia",
                    gender: "Male",
                    birthYear: 1950,
                    status: "Single",
                    minMonthlyBudget: 1300,
                    maxMonthlyBudget: 2300,
                    hasPets: false,
                    isSmoker: false,
                    isReligionImportant: false,
                    isDietImportant: true,
                    hasHomeToShare: false
                },
                {
                    username: "Foxtrot",
                    gender: "Other",
                    birthYear: 1980,
                    status: "Couple",
                    minMonthlyBudget: 1400,
                    maxMonthlyBudget: 1600,
                    hasPets: false,
                    isSmoker: false,
                    isReligionImportant: true,
                    isDietImportant: false,
                    hasHomeToShare: true
                },
                {
                    username: "Grinch",
                    gender: "Other",
                    birthYear: 1960,
                    status: "Single",
                    minMonthlyBudget: 2500,
                    maxMonthlyBudget: 3700,
                    hasPets: false,
                    isSmoker: true,
                    isReligionImportant: false,
                    isDietImportant: false,
                    hasHomeToShare: false
                }
            ];
            const limit = 4;
            const start = 5;
            //when
            const result = limitResults(data,limit,start);
            const expected = [
                {
                    username: "Foxtrot",
                    gender: "Other",
                    birthYear: 1980,
                    status: "Couple",
                    minMonthlyBudget: 1400,
                    maxMonthlyBudget: 1600,
                    hasPets: false,
                    isSmoker: false,
                    isReligionImportant: true,
                    isDietImportant: false,
                    hasHomeToShare: true
                },
                {
                    username: "Grinch",
                    gender: "Other",
                    birthYear: 1960,
                    status: "Single",
                    minMonthlyBudget: 2500,
                    maxMonthlyBudget: 3700,
                    hasPets: false,
                    isSmoker: true,
                    isReligionImportant: false,
                    isDietImportant: false,
                    hasHomeToShare: false
                }
            ];
            //then
            expect(result).toStrictEqual(expected);
        });
    })
})