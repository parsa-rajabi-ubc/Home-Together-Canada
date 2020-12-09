/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.18
 *
 * @Description: Large text area form Component. Returns a text area box for larger string input.
 *
 */
import React from 'react';
import PropTypes from "prop-types";

function LargeTextArea(props) {
    const {name, placeholder, onChange} = props;
    return (
        <label>
            <textarea className={"input "} name={name} rows="5" cols="50" placeholder={placeholder}
                      onChange={onChange}/>
        </label>
    );
}

LargeTextArea.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export default LargeTextArea;