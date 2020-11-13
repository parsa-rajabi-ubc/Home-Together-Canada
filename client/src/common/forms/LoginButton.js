import React from 'react';
import PropTypes from "prop-types";

//returns generic Submit button field for a form with a label
function SubmitButton(props){
    const { label, onClick } = props;

    return(
        <label>
            {props.label}
            <input type="submit" value="Login" onClick={onClick}/>
        </label>
    );
}

SubmitButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

export default SubmitButton