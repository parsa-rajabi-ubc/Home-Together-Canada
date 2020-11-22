/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Checkbox input Form Component
 *
 */

import React from 'react';
import PropTypes from "prop-types";

function Checkbox(props){
    const { label, onChange, checked } = props;
    return(
        <label className={"block label mt-0 "}>
            <input className={" align-middle mr-2 my-4 font-medium text-gray-700 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-lg"} type="checkbox" onChange={onChange} checked={checked}/>
            {label}

        </label>
    );
}
Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func
}

export default Checkbox;