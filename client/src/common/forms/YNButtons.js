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

function YNButton(props){
    const { label, name, onChange } = props;
    return(
        <label>
            <div className={""}>
                <div className={"label text-base "}>{label}</div>
                <RadioButton label="No" name={name} value="no" onChange={onChange}/>
                <RadioButton label="Yes" name={name} value="yes"  onChange={onChange}/>
            </div>
        </label>
    );
}

YNButton.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func
}

export default YNButton;