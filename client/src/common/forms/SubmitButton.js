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
            {label}
            <input className={className} type="submit" value={inputValue} onClick={onClick}/>
        </label>
    );
}

SubmitButton.propTypes = {
    onClick: propTypes.func.isRequired,
    label: propTypes.string,
    className: propTypes.string,
    inputValue: propTypes.string
};

export default SubmitButton;
