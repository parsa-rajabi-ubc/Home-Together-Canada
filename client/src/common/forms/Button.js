/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Button input Form Component
 *
 */

import React from 'react';
import PropTypes from "prop-types";

function Button(props){
    const { label, className, onClick, value } = props;
    return(
        <label>
            {label}
            <input className={className} type="button" value={value} onClick={onClick}/>
        </label>
    );
}
Button.propTypes = {
    value: PropTypes.string.isRequired,
    className:  PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func
}

export default Button;