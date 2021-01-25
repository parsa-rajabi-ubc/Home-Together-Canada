/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.01.24
 *
 * @Description: test for general utility functions
 *
 */

import {isValueInArray, resolveBooleanToYesNo} from "../generalUtils";

describe('generalUtils', () => {
    describe('resolveBooleanToYesNo', () => {
        it('should return yes when value is true', () => {
            // given
            const value = true;

            // when
            const result = resolveBooleanToYesNo("yes");

            // then
            expect(result).toBe(true);
        });
        it('should return no when value is false', () => {
            // given
            const value = false;

            // when
            const result = resolveBooleanToYesNo(value);

            // then
            expect(result).toBe("no");
        });
    });
    describe('isValueInArray', () => {
        it('should return true when value is in array', () => {
            // given
            const array =["dog", "cat", "fish"];
            const value = "dog";

            // when
            const result = isValueInArray(array, value)

            // then
            expect(result).toBe(true);
        });
        it('should return false when value is not in array', () => {
            // given
            const array =["dog", "cat", "fish"];
            const value = "ice cream";

            // when
            const result = isValueInArray(array, value)

            // then
            expect(result).toBe(false);
        });
    });
});