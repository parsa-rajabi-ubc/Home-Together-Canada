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
                    age: 13,
                    status: "Single",
                    minRent: 200,
                    maxRent: 550,
                    pet: false,
                    smoke: false,
                    religion: false,
                    diet: false,
                },
                {
                    username: "Babar",
                    gender: "Male",
                    age: 30,
                    status: "Couple With Children",
                    minRent: 2000,
                    maxRent: 5500,
                    pet: true,
                    smoke: true,
                    religion: true,
                    diet: true,
                },
                {
                    username: "CREATINE",
                    gender: "Other",
                    age: 20,
                    status: "Single",
                    minRent: 800,
                    maxRent: 1200,
                    pet: false,
                    smoke: true,
                    religion: true,
                    diet: true,
                },
                {
                    username: "DonaldDuck",
                    gender: "Male",
                    age: 35,
                    status: "Single Parent",
                    minRent: 500,
                    maxRent: 600,
                    pet: false,
                    smoke: false,
                    religion: true,
                    diet: true,
                },
                {
                    username: "EusticeOfNarnia",
                    gender: "Male",
                    age: 70,
                    status: "Single",
                    minRent: 1300,
                    maxRent: 2300,
                    pet: false,
                    smoke: false,
                    religion: false,
                    diet: true,
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
                    age: 13,
                    status: "Single",
                    minRent: 200,
                    maxRent: 550,
                    pet: false,
                    smoke: false,
                    religion: false,
                    diet: false,
                },
                {
                    username: "Babar",
                    gender: "Male",
                    age: 30,
                    status: "Couple With Children",
                    minRent: 2000,
                    maxRent: 5500,
                    pet: true,
                    smoke: true,
                    religion: true,
                    diet: true,
                },
                {
                    username: "CREATINE",
                    gender: "Other",
                    age: 20,
                    status: "Single",
                    minRent: 800,
                    maxRent: 1200,
                    pet: false,
                    smoke: true,
                    religion: true,
                    diet: true,
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
                    age: 13,
                    status: "Single",
                    minRent: 200,
                    maxRent: 550,
                    pet: false,
                    smoke: false,
                    religion: false,
                    diet: false,
                },
                {
                    username: "Babar",
                    gender: "Male",
                    age: 30,
                    status: "Couple With Children",
                    minRent: 2000,
                    maxRent: 5500,
                    pet: true,
                    smoke: true,
                    religion: true,
                    diet: true,
                },
                {
                    username: "CREATINE",
                    gender: "Other",
                    age: 20,
                    status: "Single",
                    minRent: 800,
                    maxRent: 1200,
                    pet: false,
                    smoke: true,
                    religion: true,
                    diet: true,
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
                    age: 13,
                    status: "Single",
                    minRent: 200,
                    maxRent: 550,
                    pet: false,
                    smoke: false,
                    religion: false,
                    diet: false,
                },
                {
                    username: "Babar",
                    gender: "Male",
                    age: 30,
                    status: "Couple With Children",
                    minRent: 2000,
                    maxRent: 5500,
                    pet: true,
                    smoke: true,
                    religion: true,
                    diet: true,
                },
                {
                    username: "CREATINE",
                    gender: "Other",
                    age: 20,
                    status: "Single",
                    minRent: 800,
                    maxRent: 1200,
                    pet: false,
                    smoke: true,
                    religion: true,
                    diet: true,
                },
                {
                    username: "DonaldDuck",
                    gender: "Male",
                    age: 35,
                    status: "Single Parent",
                    minRent: 500,
                    maxRent: 600,
                    pet: false,
                    smoke: false,
                    religion: true,
                    diet: true,
                },
                {
                    username: "EusticeOfNarnia",
                    gender: "Male",
                    age: 70,
                    status: "Single",
                    minRent: 1300,
                    maxRent: 2300,
                    pet: false,
                    smoke: false,
                    religion: false,
                    diet: true,
                },
                {
                    username: "Foxtrot",
                    gender: "Other",
                    age: 65,
                    status: "Couple",
                    minRent: 1400,
                    maxRent: 1600,
                    pet: false,
                    smoke: false,
                    religion: true,
                    diet: false,
                },
                {
                    username: "Grinch",
                    gender: "Other",
                    age: 85,
                    status: "Single",
                    minRent: 2500,
                    maxRent: 3700,
                    pet: false,
                    smoke: true,
                    religion: false,
                    diet: false,
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
                    age: 65,
                    status: "Couple",
                    minRent: 1400,
                    maxRent: 1600,
                    pet: false,
                    smoke: false,
                    religion: true,
                    diet: false,
                },
                {
                    username: "Grinch",
                    gender: "Other",
                    age: 85,
                    status: "Single",
                    minRent: 2500,
                    maxRent: 3700,
                    pet: false,
                    smoke: true,
                    religion: false,
                    diet: false,
                }
            ];
            //then
            expect(result).toStrictEqual(expected);
        });
    })
})