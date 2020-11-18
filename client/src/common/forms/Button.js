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
    const { label, onClick } = props;
    return(
        <label>
            {props.label}
            <input type="button" value={props.value} onClick={onClick}/>
        </label>
    );
}
Button.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default Button;