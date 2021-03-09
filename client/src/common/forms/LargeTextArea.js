/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.18
 *
 * @Description: Large text area form Component. Returns a text area box for larger string input.
 *
 */
import React from 'react';
import PropTypes from "prop-types";
import Asterisk from "./Asterisk";
import Tooltip from "./Tooltip";

function LargeTextArea(props) {
    const {
        label,
        name,
        placeholder,
        required,
        disabled,
        customDisabled,
        value,
        onChange,
        toolTipID,
        toolTipText,
        rows,
        className = "input"
    } = props;
    return (
        <div>
            <label className={"label"}>
                {label}
            </label>
            {(required ? <Asterisk/> : '')}
            {toolTipID &&
            <Tooltip
                text={toolTipText}
                toolTipID={toolTipID}
            />
            }
            <textarea
                className={`${disabled && "disabled-field"} ${customDisabled && "opacity-100 my-4 p-4 bg-gray-200 text-gray-800 text-sm"} ${className}`}
                name={name}
                rows={rows}
                cols="50"
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
                value={value}
            />
        </div>
    );
}

LargeTextArea.propTypes = {
    label: PropTypes.string.isRequired,
    toolTipText: PropTypes.string,
    toolTipID: PropTypes.string,
    name: PropTypes.string,
    rows: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    customDisabled: PropTypes.bool,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func
};

export default LargeTextArea;