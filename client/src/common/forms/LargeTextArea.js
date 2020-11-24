/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.18
 *
 * @Description: Large text area form Component. Returns a text area box for larger string input.
 *
 */
import React from 'react';
import PropTypes from "prop-types";

function LargeTextArea(props){
    const { label, name, placeholder, onChange } = props;
    return(
        <label>
            {label}
            <textarea name={name} rows="8" cols="50" placeholder={placeholder} onChange={onChange}/>
        </label>
    );
}
LargeTextArea.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
}

export default LargeTextArea;