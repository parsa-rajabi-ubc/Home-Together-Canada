/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.12.19
 *
 * @Description: Label with Red Asterisk
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import Asterisk from "./Asterisk";

function LabelAsterisk(props) {
    const {label} = props;
    return (
        <label className={"label"}>
            {label} <Asterisk/>
        </label>
        
    );
}
LabelAsterisk.propTypes = {
    label: PropTypes.string.isRequired
};

export default LabelAsterisk;