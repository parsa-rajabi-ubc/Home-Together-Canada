import React from 'react';
import PropTypes from "prop-types";

//returns generic textbox field for a form with a label
function TextArea(props){
    return(
        <label>
            {props.label}
            <input type="text" placeholder={props.placeholder} />
        </label>
    );
}
TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
}

export default TextArea