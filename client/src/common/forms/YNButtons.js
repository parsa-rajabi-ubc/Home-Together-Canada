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

function YNButton(props) {
    const {name, onChange} = props;
    return (
        <div>
            <RadioButton label="No" name={name} value="no" onChange={onChange}/>
            <RadioButton label="Yes" name={name} value="yes" onChange={onChange}/>
        </div>
    );
}

YNButton.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func
}

export default YNButton;