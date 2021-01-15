/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Checkbox input Form Component
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import Tooltip from "./Tooltip";

function Checkbox(props) {
    const {onChange, checked, label, toolTipText, toolTipID, id, fontNormal,
        className = "defaultCheckboxCSS"} = props;
    return (
        <div>
            <input
                className={className} id={id}
                type="checkbox" onChange={onChange} checked={checked}/>
            <label className={`${fontNormal && "label font-normal"} label`}>{label}</label>
            {toolTipID && <Tooltip text={toolTipText} toolTipID={toolTipID}/>}
        </div>
    );
}

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    toolTipText: PropTypes.string,
    toolTipID: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    id: PropTypes.string,
    fontNormal: PropTypes.bool
};

export default Checkbox;