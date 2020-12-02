/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Test box input Form Component
 *
 */

import React from 'react';
import PropTypes from "prop-types";

function TextArea(props) {
    const {
        label,
        labelClassName,
        className,
        placeholder,
        onChange,
        autoComplete,
        disabled = false,
        value
    } = props;
    return (
        <label className={labelClassName}>
            {label}
            <input
                className={className}
                type="text"
                placeholder={placeholder}
                autoComplete={autoComplete}
                onChange={onChange}
                disabled={disabled}
                value={value}
            />
        </label>
    );
}

TextArea.propTypes = {
    label: PropTypes.string,
    labelClassName: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.string
}

export default TextArea;