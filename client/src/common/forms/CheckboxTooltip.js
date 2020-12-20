/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.12.19
 *
 * @Description: Checkbox input form component with tooltip
 *
 */

import React from 'react';
import PropTypes from "prop-types";

function CheckboxTooltip(props) {
    const {onChange, checked} = props;
    return (
        <label>
            <input
                className={"align-middle mt-3 mr-1 my-4 font-medium text-gray-700 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-lg"}
                type="checkbox" onChange={onChange} checked={checked}/>
        </label>
    );
}

CheckboxTooltip.propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func
};

export default CheckboxTooltip;