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
    const {className, inputType, onChange} = props;
    return (

        <label>
            {label}
            <input className={props.className} type={props.inputType} placeholder={props.placeholder} onChange={onChange}/>
        </label>
    );
}

GenericInput.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export default GenericInput;