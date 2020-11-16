import React from "react";
import PropTypes from 'prop-types';
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Phone Number input Form Component
 *
 */
function PhoneNumInput(props){
    const { label, onChange } = props;
    return(
        <div>
            <label>
                {props.label}
                <input type="text" name="first" placeholder="555" onChange= {onChange}/>
            </label>
            <label>
                -
                <input type="text" name="middle" placeholder="555" onChange= {onChange}/>
            </label>
            <label>
                -
                <input type="text" name="last" placeholder="5555" onChange= {onChange}/>
            </label>
        </div>
    );
}
PhoneNumInput.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default PhoneNumInput;