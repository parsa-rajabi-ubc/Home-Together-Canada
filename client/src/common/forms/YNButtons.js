/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.16
 *
 * @Description: Yes/No radio button form functional Component.
 *
 */

import React from 'react'
import PropTypes from 'prop-types';
import TextArea from "./TextArea";
import RadioButton from "./RadioButton";

function YNButton(props){
    const { label, name, checked, onChange } = props;
    return(
        <label>
            <div>
                <p>{label}</p>
                <RadioButton label="yes: " name={name} value="yes" checked={!checked} onChange={onChange}/>
                <RadioButton label="no: " name={name} value="no" checked={checked} onChange={onChange}/>
                <TextArea label="If Yes, Elaborate: " placeholder="" disabled={checked}/>
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