import React from 'react';
import PropTypes from "prop-types";
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Test box input Form Component
 *
 */

//returns generic textbox field for a form with a label
function TextArea(props){
    const { onChange } = props;

    return(
        <label>
            {props.label}
            <input type="text" onChange= {onChange}/>
        </label>
    );
}

TextArea.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func
}

export default TextArea;
