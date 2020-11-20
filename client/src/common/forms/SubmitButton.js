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
    const { className, inputValue, onClick } = props;
    return(
        <label>
            <input className={className} type="submit" value={inputValue} onClick={onClick}/>
        </label>
    );
}

SubmitButton.propTypes = {
    onClick: propTypes.func.isRequired,
    className: propTypes.string,
    inputValue: propTypes.string
};

export default SubmitButton;
