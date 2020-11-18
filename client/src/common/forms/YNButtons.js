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
    const { label, checked, onChange } = props;
    return(
        <label>
            <div>
                <p>{label}</p>
                <RadioButton label="yes: " name="yes" value="yes" checked={checked} onChange={onChange}/>
                <RadioButton label="no: " name="no" value="no" checked={!checked} onChange={onChange}/>
                <TextArea label="If Yes, Elaborate: " placeholder=""/>
            </div>
        </label>
    );
}

YNButton.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func
}

export default YNButton;