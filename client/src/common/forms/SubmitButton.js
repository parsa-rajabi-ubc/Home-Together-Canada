import React from 'react';
import propTypes from "prop-types";
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Submit button input Form Component
 *
 */
function SubmitButton(props){
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

export default SubmitButton;
