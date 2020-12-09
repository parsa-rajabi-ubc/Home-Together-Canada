/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.12.09
 *
 * @Description: Tooltip Component
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import {BsFillInfoCircleFill} from 'react-icons/bs';


function Tooltip(props) {
    const {text, toolTipID} = props;
    return (
        <span>
        <a data-tip data-for={toolTipID}>
            <BsFillInfoCircleFill className={"inline ml-1 mb-1 text-yellow-500 hover:text-green-600"}/>
        </a>
        <ReactTooltip id={toolTipID} className="" type={"dark"} effect="solid">
            {text}
        </ReactTooltip>
        </span>
    );
}

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    toolTipID: PropTypes.string.isRequired
};

export default Tooltip;