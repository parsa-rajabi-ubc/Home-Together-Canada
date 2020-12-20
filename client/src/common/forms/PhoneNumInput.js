/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Phone Number input Form Component
 *
 */

import React from "react";
import PropTypes from 'prop-types';
import Asterisk from "./Asterisk";

function PhoneNumInput(props){
    const { label, labelClassName, className, required, onChange } = props;
    // Updated autoComplete based on: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
    return(
        <div>
            <label className={labelClassName}>
                {label}  {(required ? <Asterisk/> : '')}
                <br/>
                <input className={className} type="text" autoComplete="tel-area-code"
                       name="first" placeholder="222" onChange= {onChange} maxLength="3"/>
            </label>
            <label>
                <input className={className} type="text" autoComplete="tel-local-prefix"
                       name="middle" placeholder="333" onChange= {onChange} maxLength="3"/>
            </label>
            <label>
                <input className={className} type="text" autoComplete="tel-local-suffix"
                       name="last" placeholder="4444" onChange= {onChange} maxLength="4"/>
            </label>
        </div>
    );
}
PhoneNumInput.propTypes = {
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    labelClassName: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default PhoneNumInput;