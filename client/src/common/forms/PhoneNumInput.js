/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Phone Number input Form Component
 *
 */

import React from "react";
import PropTypes from 'prop-types';

function PhoneNumInput(props){
    const { label, labelClassName, className, onChange } = props;
    return(
        <div>
            <label className={labelClassName}>
                {label}
                <br/>
                <input className={className} type="text" name="first" placeholder="222" onChange= {onChange} maxLength="3"/>
            </label>
            <label>
                <input className={className} type="text" name="middle" placeholder="333" onChange= {onChange} maxLength="3"/>
            </label>
            <label>
                <input className={className} type="text" name="last" placeholder="4444" onChange= {onChange} maxLength="4"/>
            </label>
        </div>
    );
}
PhoneNumInput.propTypes = {
    label: PropTypes.string.isRequired,
    labelClassName: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default PhoneNumInput;