import React from 'react';
import PropTypes from "prop-types";

/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Button input Form Component
 *
 */
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