import React from 'react';
import PropTypes from "prop-types";
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Test box input Form Component
 *
 */
function TextArea(props){
    return(
        <label>
            {props.label}
            <input type="text" placeholder={props.placeholder} />
        </label>
    );
}
TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
}

export default TextArea;