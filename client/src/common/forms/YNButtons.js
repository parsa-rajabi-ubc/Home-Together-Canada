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
    const {label, name, onChange, required, toolTipID, toolTipText} = props;
    return (
        <label>
            <div>
                <div>
                    <label className={"label text-base"}>{label}</label>
                    {(required ? <Asterisk/> : '')}
                    {toolTipID && <Tooltip text={toolTipText} toolTipID={toolTipID}/>}
                </div>
                <RadioButton label="No" name={name} value="no" onChange={onChange}/>
                <RadioButton label="Yes" name={name} value="yes" onChange={onChange}/>
            </div>
        </label>
    );
}

YNButton.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    toolTipText: PropTypes.string,
    toolTipID: PropTypes.string,
    required: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func
};

export default YNButton;