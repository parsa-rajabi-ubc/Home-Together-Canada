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
    const { label, className, placeholder, onChange } = props;
    return(
        <label>
            {label}
            <input className={className} type="text" placeholder={placeholder} onChange= {onChange}/>
        </label>
    );
}
TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export default TextArea;