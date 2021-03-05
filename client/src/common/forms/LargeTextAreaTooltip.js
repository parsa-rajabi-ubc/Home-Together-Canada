/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.12.19
 *
 * @Description: Large text area for tooltip form Component. Returns a text area box for larger string input.
 *
 */
import React from 'react';
import PropTypes from "prop-types";

function LargeTextAreaTooltip(props) {
    const {name, placeholder, onChange} = props;
    return (
        <label>
            <textarea className={"input "} name={name} rows="5" cols="50" placeholder={placeholder}
                      onChange={onChange}/>
        </label>
    );
}

LargeTextAreaTooltip.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export default LargeTextAreaTooltip;