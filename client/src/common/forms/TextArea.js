import React from 'react';
import PropTypes from "prop-types";

//returns generic textbox field for a form with a label
function TextArea(props){
    const { onChange } = props;

    return(
        <label>
            {props.label}
            <input type="text" onChange= {onChange}/>
        </label>
    );
}

TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func
}

export default TextArea
