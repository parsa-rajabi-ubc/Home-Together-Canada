/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Test box input Form Component
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import Asterisk from './Asterisk';

function TextArea(props) {
    const {
        label,
        labelClassName,
        className,
        placeholder,
        onChange,
        autoComplete,
        required,
        disabled = false,
        value,
        charLimit
    } = props;
    return (
        <section>
            <label className={labelClassName}>
                {label}
            </label>
            {(required ? <Asterisk/> : '')}
            <input
                className={`${disabled && "disabled-field"} ${className}`}
                type="text"
                placeholder={placeholder}
                autoComplete={autoComplete}
                onChange={onChange}
                disabled={disabled}
                value={value}
                maxLength={charLimit}
            />
        </section>
    );
}

TextArea.propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    labelClassName: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    charLimit: PropTypes.number
}

export default TextArea;