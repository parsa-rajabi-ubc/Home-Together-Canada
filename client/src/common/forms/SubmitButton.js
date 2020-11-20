/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Submit button input Form Component
 *
 */

import React from 'react';
import propTypes from "prop-types";

function SubmitButton(props){
    const { className, label, inputValue, onClick } = props;
    return(
        <label>
            {props.label}
            <input className={props.className} type="submit" value={props.inputValue} onClick={onClick}/>
        </label>
    );
}

SubmitButton.propTypes = {
    className: propTypes.string,
    label: propTypes.string.isRequired,
    inputValue: propTypes.string,
    onClick: propTypes.func.isRequired
}

export default SubmitButton;
