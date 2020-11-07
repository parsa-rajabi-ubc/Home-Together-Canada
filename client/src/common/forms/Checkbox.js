import React from 'react';
import PropTypes from "prop-types";

//returns generic Checkbox field for a form with a label
function Checkbox(props){
    return(
        <label>
            {props.label}
            <input type="checkbox" value="1" />
        </label>
    );
}
Checkbox.propTypes = {
    label: PropTypes.string.isRequired
}

export default Checkbox