import isStringEmpty from "./isStringEmpty";
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.15
 *
 * @Description: Input Validation component unit tests to see if textarea value is empty.
 *
 */

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