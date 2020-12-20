/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.12.19
 *
 * @Description: Yes/No radio button for tooltip form functional Component.
 *
 */

import React from 'react'
import PropTypes from 'prop-types';
import RadioButton from "./RadioButton";

function YNButtonTooltip(props) {
    const {name, onChange} = props;
    return (
        <div>
            <RadioButton label="No" name={name} value="no" onChange={onChange}/>
            <RadioButton label="Yes" name={name} value="yes" onChange={onChange}/>
        </div>
    );
}

YNButtonTooltip.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func
}

export default YNButtonTooltip;