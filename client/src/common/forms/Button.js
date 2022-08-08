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
    const { label, className, onClick, value, id} = props;
    return(
        <label>
            {label}
            <input className={className} type="button" value={value} onClick={onClick} id={id}/>
        </label>
    );
}
Button.propTypes = {
    value: PropTypes.string.isRequired,
    className:  PropTypes.string,
    label: PropTypes.string,
    id: PropTypes.string,
    onClick: PropTypes.func
}

export default Button;