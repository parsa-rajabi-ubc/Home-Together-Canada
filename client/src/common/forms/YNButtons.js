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
    const {label, name, onChange, required, toolTipID, toolTipText, value} = props;
    return (
        <div>
            <div>
                <label className={"label text-base"}>{label}</label>
                {(required ? <Asterisk/> : '')}
                {toolTipID && <Tooltip text={toolTipText} toolTipID={toolTipID}/>}
            </div>
            <RadioButton label="No" name={name} value="no" onChange={onChange} checked={value==="no"}/>
            <RadioButton label="Yes" name={name} value="yes" onChange={onChange} checked={value==="yes"}/>
        </div>
    );
}

YNButton.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    toolTipText: PropTypes.string,
    toolTipID: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default YNButton;