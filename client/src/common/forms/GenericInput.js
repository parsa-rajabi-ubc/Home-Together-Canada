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
    const {
        className,
        inputType,
        placeholder,
        autoComplete,
        onChange,
        label,
        onClick,
        classNameLabel,
        value,
        onKeyDown,
        charLimit
    } = props;
    return (
        <label>
            <label className={classNameLabel}>
                {label}
            </label>
            <input
                className={className}
                type={inputType}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onChange={onChange}
                onClick={onClick}
                value={value}
                onKeyDown={onKeyDown}
                maxLength={charLimit}
            />
        </label>
    );
}

GenericInput.propTypes = {
    inputType: PropTypes.string.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
    classNameLabel: PropTypes.string,
    placeholder: PropTypes.string,
    autoComplete: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    value: PropTypes.any,
    charLimit: PropTypes.number
};

export default GenericInput;
