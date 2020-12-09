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
    const {text, type} = props;
    return (
        <span>
        <a data-tip data-for="happyFace">
            <BsFillInfoCircleFill className={"inline ml-2 mb-1"}/>
        </a>
        <ReactTooltip id="happyFace" className="" type={type}>
            <span>{text}</span>
        </ReactTooltip>
        </span>
    );
}

Tooltip.propTypes = {
    text: PropTypes.string,
    type: PropTypes.string

}

export default Tooltip;