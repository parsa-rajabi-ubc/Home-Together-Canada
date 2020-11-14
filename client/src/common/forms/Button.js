import React from 'react';
import PropTypes from "prop-types";

//returns generic Button field for a form with a label
export function Button(props){
    return(
        <label>
            {props.label}
            <input type="button" value={props.value} />
        </label>
    );
}
Button.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

export default Button;