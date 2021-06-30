/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Submit button input Form Component
 *
 */

import React from 'react';
import PropTypes from "prop-types";

function SubmitButton(props){
    const { label, className, inputValue, onClick, disabled=false } = props;
    return(
        <label>
            {label}
            <input className={className} type="submit" value={inputValue} onClick={onClick} disabled={disabled}/>
        </label>
    );
}

SubmitButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
    inputValue: PropTypes.string,
    disabled: PropTypes.bool
};

export default SubmitButton;
