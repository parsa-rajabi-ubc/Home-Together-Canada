/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Test box input Form Component
 *
 */

import React from 'react';
import PropTypes from "prop-types";

function TextArea(props){
    const { label, labelClassName, className, placeholder, onChange, disabled=false } = props;
    return(
        <label className={labelClassName}>
            {label}
            <input className={className} type="text" placeholder={placeholder} onChange= {onChange} disabled={disabled}/>
        </label>
    );
}
TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    labelClassName: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
}

export default TextArea;