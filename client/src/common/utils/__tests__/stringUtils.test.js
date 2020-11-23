/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.15
 *
 * @Description: Utility file testing for functions evaluating strings
 *
 */

import {isStringEmail, isStringEmpty, isStringSame, isStringNumeralsOnly, splitPhoneNumber} from "../stringUtils";

describe('isStringEmpty function', () => {
    describe('unit test', () => {
        it("should return true when given an empty string", () => {
            //given
            const str = "";
            //when
            const result = isStringEmpty(str);
            //then
            expect(result).toBe(true);
        });
        it("should return true when given a null value", () => {
            //given
            const str = null;
            //when
            const result = isStringEmpty(str);
            //then
            expect(result).toBe(true);
        });
        it("should return true when given a whitespace string", () => {
            //given
            const str = "         ";
            //when
            const result = isStringEmpty(str);
            //then
            expect(result).toBe(true);
        });
        it("should return true when given a whitespace string", () => {
            //given
            let str;
            //when
            const result = isStringEmpty(str);
            //then
            expect(result).toBe(true);
        });
        it("should return false when given a string with characters", () => {
            //given
            const str = "randomString";
            //when
            const result = isStringEmpty(str);
            //then
            expect(result).toBe(false);
        });
        it("should return false when given a string with numerals only", () => {
            //given
            const str = "12345";
            //when
            const result = isStringEmpty(str);
            //then
            expect(result).toBe(false);
        });
    })
})

describe('isStringEmail function', () => {
    describe('unit test', () => {
        it("should return false when given an empty string", () => {
            //given
            const str = "";
            //when
            const result = isStringEmail(str);
            //then
            expect(result).toBe(false);
        });
        it("should return false when not given an @ symbol", () => {
            //given
            const str = "randomString.randomString";
            //when
            const result = isStringEmail(str);
            //then
            expect(result).toBe(false);
        });
        it("should return false when not given a period for the domain after the @ symbol", () => {
            //given
            const str = "randomString@randomString";
            //when
            const result = isStringEmail(str);
            //then
            expect(result).toBe(false);
        });
        it("should return true when given a valid email structure with all lowercase", () => {
            //given
            const str = "randomstring@randomstring.com";
            //when
            const result = isStringEmail(str);
            //then
            expect(result).toBe(true);
        });
        it("should return true when given a valid email structure with all uppercase", () => {
            //given
            const str = "RANDOM@STRING.COM";
            //when
            const result = isStringEmail(str);
            //then
            expect(result).toBe(true);
        });
        it("should return true when given a valid email structure with uppercase and lowercase", () => {
            //given
            const str = "RandomString@String.coM";
            //when
            const result = isStringEmail(str);
            //then
            expect(result).toBe(true);
        });
        it("should return true when given a valid email structure with uppercase and lowercase and numerals", () => {
            //given
            const str = "Random123@Domain5.com";
            //when
            const result = isStringEmail(str);
            //then
            expect(result).toBe(true);
        });

    })
})

describe('isStringNumeralsOnly function', () => {
    describe('unit test', () => {
        it("should return true when given a digit", () => {
            //given
            const str = "7";
            //when
            const result = isStringNumeralsOnly(str);
            //then
            expect(result).toBe(true);
        });
        it("should return true when given only numbers", () => {
            //given
            const str = "1234567890";
            //when
            const result = isStringNumeralsOnly(str);
            //then
            expect(result).toBe(true);
        });
        it("should return false when given numbers with a decimal point", () => {
            //given
            const str = "5.55";
            //when
            const result = isStringNumeralsOnly(str);
            //then
            expect(result).toBe(false);
        });
        it("should return false when given numbers with whitespace", () => {
            //given
            const str = "555   ";
            //when
            const result = isStringNumeralsOnly(str);
            //then
            expect(result).toBe(false);
        });
        it("should return false when given alphanumeric character combinations", () => {
            //given
            const str = "abc123";
            //when
            const result = isStringNumeralsOnly(str);
            //then
            expect(result).toBe(false);
        });
        it("should return false when given a null value", () => {
            //given
            const str = null;
            //when
            const result = isStringNumeralsOnly(str);
            //then
            expect(result).toBe(false);
        });
        it("should return false when given an undefined string", () => {
            //given
            let str;
            //when
            const result = isStringNumeralsOnly(str);
            //then
            expect(result).toBe(false);
        });
    })
})

describe('isStringSame function', () => {
    describe('unit test', () => {
        it("should return true when string is identical", () => {
            //given
            const str1 = "password123";
            const str2 = "password123";
            //when
            const result = isStringSame(str1,str2);
            //then
            expect(result).toBe(true);
        });
        it("should return false when string is identical besides whitespace", () => {
            //given
            const str1 = "password123";
            const str2 = "  password123  ";
            //when
            const result = isStringSame(str1,str2);
            //then
            expect(result).toBe(false);
        });
        it("should return false when string is identical besides capitalization", () => {
            //given
            const str1 = "password123";
            const str2 = "Password123";
            //when
            const result = isStringSame(str1,str2);
            //then
            expect(result).toBe(false);
        });
        it("should return false when one string is empty", () => {
            //given
            const str1 = "password123";
            const str2 = "";
            //when
            const result = isStringSame(str1,str2);
            //then
            expect(result).toBe(false);
        });
        it("should return false when one string is null", () => {
            //given
            const str1 = "password123";
            const str2 = null;
            //when
            const result = isStringSame(str1,str2);
            //then
            expect(result).toBe(false);
        });
        it("should return false when both are null", () => {
            //given
            const str1 = null;
            const str2 = null;
            //when
            const result = isStringSame(str1,str2);
            //then
            expect(result).toBe(false);
        });
        it("should return false when one string is undefined", () => {
            //given
            const str1 = "password123";
            let str2;
            //when
            const result = isStringSame(str1,str2);
            //then
            expect(result).toBe(false);
        });
        it("should return false when both are undefined", () => {
            //given
            let str1;
            let str2;
            //when
            const result = isStringSame(str1,str2);
            //then
            expect(result).toBe(false);
        });
    })
})
describe('splitPhoneNumber function', () => {
    describe('unit test', () => {
        it("should return true when string is in proper form", () => {
            //given
            const str1 = "123-456-7890";
            //when
            const result = splitPhoneNumber(str1);
            const expected = ['123','456','7890'];
            //then
            expect(result).toStrictEqual(expected);
        });
    })
})