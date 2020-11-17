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
    const { onClick } = props;

    return(
        <label>
            {props.label}
            <input type="submit" value = {props.value} onClick={onClick}/>
        </label>
    );
}

SubmitButton.propTypes = {
    label: propTypes.string.isRequired,
    onClick: propTypes.func,
    value: propTypes.string.isRequired
}

export default SubmitButton;
