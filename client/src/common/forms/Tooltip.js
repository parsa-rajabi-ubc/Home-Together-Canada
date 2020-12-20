/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.12.20
 *
 * @Description: Tooltip Component
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import {BsFillQuestionSquareFill} from 'react-icons/bs';


function Tooltip(props) {
    const {text, toolTipID} = props;
    return (
        <span>
        <a data-tip data-for={toolTipID}>
            <BsFillQuestionSquareFill className={"inline ml-1 mb-1 text-blue-500 hover:text-blue-400"}/>
        </a>
        <ReactTooltip id={toolTipID} type={"dark"} effect="solid">
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