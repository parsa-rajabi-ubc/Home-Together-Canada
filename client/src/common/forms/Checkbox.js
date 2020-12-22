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

function Checkbox(props){
    const {onChange, checked, label, toolTipText, toolTipID} = props;
    return(
        <div>
            <input className={" align-middle mr-2 my-4 font-medium text-gray-700 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded-lg"} type="checkbox" onChange={onChange} checked={checked}/>
            <label className={"label"}>{label}</label>
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
};

export default Checkbox;