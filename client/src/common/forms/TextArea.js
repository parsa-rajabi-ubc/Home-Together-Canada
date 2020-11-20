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
    const { label, onChange, disabled } = props;
    return(
        <label>
            {props.label}
            <input type="text" placeholder={props.placeholder} onChange= {onChange} disabled={disabled}/>
        </label>
    );
}
TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool
}

export default TextArea;