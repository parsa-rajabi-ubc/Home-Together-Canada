/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.16
 *
 * @Description: utility functions for dropdowns
 *
 */

import indexOf from 'lodash/indexOf';

/**
 * This function takes in an array of values, then identifies all elements in the options are
 * that have the property value that matches a value in values
 *
 */

export const getSelectedOptionsForMultiSelect = (values, options) => {
    return options.filter(option => indexOf(values, option.value) !== -1);
}

export const getSelectedOptionForSingleSelect = (value, options) => {
    return options.find(option => option.value === value);
}
