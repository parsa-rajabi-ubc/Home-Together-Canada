import isStringSame from "../isStringSame";
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.15
 *
 * @Description: Input Validation component  to see if two textarea string values are the same.
 *
 */

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
    })
})