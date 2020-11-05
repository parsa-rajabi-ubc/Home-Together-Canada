import React from "react";
import PropTypes from 'prop-types';

function PhoneNumInput(props){
    return(
        <div>
            <label>
                {props.label}
                <input type="text" placeholder="555" />
            </label>
            <label>
                -
                <input type="text" placeholder="555" />
            </label>
            <label>
                -
                <input type="text" placeholder="5555" />
            </label>
        </div>
    );
}
PhoneNumInput.propTypes = {
    label: PropTypes.string.isRequired
}

export default PhoneNumInput