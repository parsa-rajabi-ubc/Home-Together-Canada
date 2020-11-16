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
    const { label, onChange } = props;
    return(
        <label>
            {props.label}
            <input type="text" placeholder={props.placeholder} onChange= {onChange}/>
        </label>
    );
}
TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
}

export default TextArea;