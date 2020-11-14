import React from 'react';
import propTypes from "prop-types";

//returns generic Submit button field for a form with a label
export function SubmitButton(props){
    return(
        <label>
            {props.label}
            <input type="submit" value="Submit" />
        </label>
    );
}

SubmitButton.propTypes = {
    label: propTypes.string.isRequired
}
