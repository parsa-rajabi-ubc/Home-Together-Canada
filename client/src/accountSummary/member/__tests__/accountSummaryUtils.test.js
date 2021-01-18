/**
 * @Author:     Jeff Hatton
 * @Created:    2020.01.16
 *
 * @Description: Utility file testing for functions for account summary
 *
 */

import {splitPhoneNumber} from "../../accountSummaryUtils";

describe('accountSummaryUtils', () => {
    describe('splitPhoneNumber function', () => {
        it("should return undefined when given an empty string", () => {
            //given
            const phoneNumber = "";
            //when
            const result = splitPhoneNumber(phoneNumber);
            //then
            expect(result).toBe(undefined);
        });
        it("should return undefined when given a null value", () => {
            //given
            const phoneNumber = null;
            //when
            const result = splitPhoneNumber(phoneNumber);
            //then
            expect(result).toBe(undefined);
        });
        it("should return undefined when given a whitespace string", () => {
            //given
            const phoneNumber = "         ";
            //when
            const result = splitPhoneNumber(phoneNumber);
            //then
            expect(result).toBe(undefined);
        });
        it("should return undefined when given a whitespace string", () => {
            //given
            let phoneNumber;
            //when
            const result = splitPhoneNumber(phoneNumber);
            //then
            expect(result).toBe(undefined);
        });
        it("should return undefined when given an invalid non-empty string", () => {
            //given
            const phoneNumber = "randomString";
            //when
            const result = splitPhoneNumber(phoneNumber);
            //then
            expect(result).toBe(undefined);
        });
        it("should return correct object when given a valid phoneNumber", () => {
            //given
            const phoneNumber = "123-455-7788";
            const expectedSplit = {
                first: "123",
                middle: "455",
                last: "7788"
            };
            //when
            const result = splitPhoneNumber(phoneNumber);
            //then
            expect(result).toStrictEqual(expectedSplit);
        });
    })
})