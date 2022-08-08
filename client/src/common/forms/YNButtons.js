/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.16
 *
 * @Description: Yes/No radio button form functional Component.
 *
 */

import React from 'react'
import PropTypes from 'prop-types';
import RadioButton from "./RadioButton";
import Asterisk from "./Asterisk";
import Tooltip from "./Tooltip";

function YNButton(props) {
    const {label, name, onChange, required, toolTipID, toolTipText, value, disabled} = props;
    return (
        <div>
            <div>
                <label className={"label text-base"}>{label}</label>
                {(required ? <Asterisk/> : '')}
                {toolTipID && <Tooltip text={toolTipText} toolTipID={toolTipID}/>}
            </div>
            <RadioButton label="No" name={name} value="no" onChange={onChange} checked={value==="no"} disabled={disabled} id={name+"_false"}/>
            <RadioButton label="Yes" name={name} value="yes" onChange={onChange} checked={value==="yes"} disabled={disabled} id={name+"_true"}/>
        </div>
    );
}

YNButton.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    toolTipText: PropTypes.string,
    toolTipID: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
};

export default YNButton;