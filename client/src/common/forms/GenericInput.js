/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.19
 *
 * @Description: Generic Input
 *
 */

import React from 'react';
import PropTypes from "prop-types";

function GenericInput(props) {
    const {className, inputType, placeholder, value, disabled=false, onChange, label} = props;
    return (

        <label>
            {label}
            <input className={className} type={inputType} placeholder={placeholder} value={value} disabled={disabled} onChange={onChange}/>
        </label>
    );
}

GenericInput.propTypes = {
    label: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};

export default GenericInput;