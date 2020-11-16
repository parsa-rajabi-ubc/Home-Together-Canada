import isStringNumeralsOnly from "../isStringNumeralsOnly";
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.15
 *
 * @Description: Input Validation component unit tests to see if textarea has strictly numeral input.
 *
 */

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
    })
})