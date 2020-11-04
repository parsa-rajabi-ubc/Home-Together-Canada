import React from 'react';
import PropTypes from "prop-types";

function Checkbox(props){
    return(
        <label>
            {props.label}
            <input type="checkbox" value="1" />
        </label>
    );
}
Checkbox.PropTypes = {
    label: PropTypes.string.isRequired
}

export default Checkbox