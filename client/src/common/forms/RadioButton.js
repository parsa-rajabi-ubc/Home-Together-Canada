/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.16
 *
 * @Description: Radio button form functional Component.
 */

import React from 'react'
import PropTypes from 'prop-types';

function RadioButton(props){
    const { label, name, value, checked, onChange } = props;
    return(
        <label>
            {label}
            <input type="radio"
                   name={name}
                   value={value}
                   checked={checked}
                   onChange={onChange}
            />
        </label>
    );
}

RadioButton.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func
}

export default RadioButton;
