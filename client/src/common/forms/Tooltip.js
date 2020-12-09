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
import { BsFillInfoCircleFill } from 'react-icons/bs';


function Tooltip(props) {
    const {text} = props;
    return (
        <span>
        <a data-tip data-for="info">
            <BsFillInfoCircleFill className={"inline ml-2 mb-1 text-gray-800 hover:text-green-600"}/>
        </a>
        <ReactTooltip id="info" className="" type={"dark"} effect='solid'>
            {text}
        </ReactTooltip>
        </span>
    );
}

Tooltip.propTypes = {
    text: PropTypes.string
}

export default Tooltip;