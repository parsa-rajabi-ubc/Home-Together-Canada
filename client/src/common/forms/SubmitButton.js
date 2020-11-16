import React from 'react';
import PropTypes from "prop-types";

//returns generic Submit button field for a form with a label
function SubmitButton(props){
    const { onClick } = props;

    return(
        <label>
            {props.label}
            <input type="submit" value = {props.value} onClick={onClick}/>
        </label>
    );
}

SubmitButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    value: PropTypes.string.isRequired
}

export default SubmitButton
