/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.18
 *
 * @Description: Large text area form Component. Returns a text area box for larger string input.
 *
 */
import React from 'react';
import PropTypes from "prop-types";
import Asterisk from "./Asterisk";

function LargeTextArea(props) {
    const {label, name, placeholder, required, onChange} = props;
    return (
        <label className={"label"}>
            {label} {(required ? <Asterisk/> : '')}

            <textarea className={"input "} name={name} rows="5" cols="50" placeholder={placeholder}
                      onChange={onChange}/>
        </label>
    );
}

LargeTextArea.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
}

export default LargeTextArea;