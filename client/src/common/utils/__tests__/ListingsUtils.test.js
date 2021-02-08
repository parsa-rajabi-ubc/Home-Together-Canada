/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.15
 *
 * @Description: Utility file testing for functions establishing listing first result index
 *
 */

import {lastPageStartIndex, previousPageStartIndex, nextPageStartIndex} from "../ListingUtils";
import {isStringEmpty} from "../stringUtils";

describe('lastPageStartIndex function', () => {
    describe('unit test', () => {
        it("should return correct idx for a last page with a remainder of results", () => {
            //given
            const totalNumResults = 26;
            const numDisplayedResults = 5
            //when
            const result = lastPageStartIndex(totalNumResults, numDisplayedResults);
            //then
            expect(result).toBe(25);
        });
        it("should return idx for a full page of results", () => {
            //given
            const totalNumResults = 26;
            const numDisplayedResults = 13
            //when
            const result = lastPageStartIndex(totalNumResults, numDisplayedResults);
            //then
            expect(result).toBe(13);
        });
    })
})
describe('nextPageStartIndex function', () => {
    describe('unit test', () => {
        it("should return next page of results", () => {
            //given
            const currentStartIdx = 9;
            const totalNumResults = 26;
            const numDisplayedResults = 5;
            //when
            const result = nextPageStartIndex(totalNumResults, numDisplayedResults, currentStartIdx);
            //then
            expect(result).toBe(14);
        });
        it("should return next page as the last page as remainder", () => {
            //given
            const currentStartIdx = 23;
            const totalNumResults = 26;
            const numDisplayedResults = 5;
            //when
            const result = nextPageStartIndex(totalNumResults, numDisplayedResults, currentStartIdx);
            //then
            expect(result).toBe(25);
        });
        it("should return next page as the last page as full page", () => {
            //given
            const currentStartIdx = 13;
            const totalNumResults = 26;
            const numDisplayedResults = 13;
            //when
            const result = nextPageStartIndex(totalNumResults, numDisplayedResults, currentStartIdx);
            //then
            expect(result).toBe(13);
        });
    })
})
describe('previousPageStartIndex function', () => {
    describe('unit test', () => {
        it("should return direct previous full page of results if possible", () => {
            //given
            const currentStartIdx = 7;
            const totalNumResults = 26;
            const numDisplayedResults = 5
            //when
            const result = previousPageStartIndex(totalNumResults, numDisplayedResults, currentStartIdx);
            //then
            expect(result).toBe(2);
        });
        it("should return first page if previous set would extend out of bounds", () => {
            //given
            const currentStartIdx = 5;
            const totalNumResults = 26;
            const numDisplayedResults = 7
            //when
            const result = previousPageStartIndex(totalNumResults, numDisplayedResults, currentStartIdx);
            //then
            expect(result).toBe(0);
        });
    })
})