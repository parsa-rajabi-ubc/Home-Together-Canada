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
import Tooltip from "./Tooltip";

function LargeTextArea(props) {
    const {label, name, placeholder, required, onChange, toolTipID, toolTipText} = props;
    return (
        <div>
            <label className={"label"}> {label} </label>{(required ? <Asterisk/> : '')}
            {toolTipID && <Tooltip text={toolTipText} toolTipID={toolTipID}/>}
            <textarea className={"input "} name={name} rows="5" cols="50" placeholder={placeholder}
                      onChange={onChange}/>
        </div>
    );
}

LargeTextArea.propTypes = {
    label: PropTypes.string.isRequired,
    toolTipText: PropTypes.string,
    toolTipID: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
};

export default LargeTextArea;