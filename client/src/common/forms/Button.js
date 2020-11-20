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
    const { label, onClick, value } = props;
    return(
        <label>
            {label}
            <input type="button" value={value} onClick={onClick}/>
        </label>
    );
}
Button.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default Button;