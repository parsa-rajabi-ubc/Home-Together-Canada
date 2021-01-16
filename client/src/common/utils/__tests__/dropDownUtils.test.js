/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.16
 *
 * @Description: utility functions' tests for dropdowns
 *
 */

import {getSelectedOptionForSingleSelect, getSelectedOptionsForMultiSelect} from "../dropdownUtils";

describe('dropDownUtils', () => {
    const options = [
        { label: 'one', value: 1 },
        { label: 'two', value: 2 },
        { label: 'three', value: 3 },
        { label: 'four', value: 4 },
        { label: 'five', value: 5 },
    ];

    describe('getSelectecOptionsForMultiSelect', () => {
       const values = [1, 2, 3];

       const expectedFilteredResult = [
           { label: 'one', value: 1 },
           { label: 'two', value: 2 },
           { label: 'three', value: 3 }
       ];
       const emptyArray = [];

        it.each`
            values          | options       | expectedResult
            ${values}       | ${options}    | ${expectedFilteredResult}
            ${emptyArray}   | ${options}    | ${emptyArray}
            ${values}       | ${emptyArray} | ${emptyArray}
       `('returns $expectedResult when $values and $options are provided',
           ({values, options, expectedResult}) => {
                expect(getSelectedOptionsForMultiSelect(values, options)).toEqual(expectedResult);
           });
   });

   describe('getSelectedOptionForSingleSelect', () => {
       const value = 2;
       const expectedFilteredOption = { label: 'two', value: 2 };

       it.each`
            value       | options   | expectedResult
            ${value}    | ${options}| ${expectedFilteredOption}
            ${undefined}| ${options}| ${undefined}
            ${0}        | ${options}| ${undefined}
       `('returns $expectedResult when $value and $options are provided',
           ({value, options, expectedResult}) => {
                expect(getSelectedOptionForSingleSelect(value, options)).toEqual(expectedResult);
           });
   });
});
