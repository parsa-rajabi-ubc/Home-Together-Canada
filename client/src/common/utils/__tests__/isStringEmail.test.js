import isStringEmail from "../isStringEmail";
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.15
 *
 * @Description: Input Validation component unit tests to see if textarea has structure of an email.
 *
 */

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