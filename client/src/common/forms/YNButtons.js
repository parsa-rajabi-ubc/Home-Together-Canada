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
import Asterisk from "./Asterisk";

function YNButton(props) {
    const {label, name, onChange, required} = props;
    return (
        <label>
            <div>
                <div className={"label text-base "}>
                    {label} {(required ? <Asterisk/> : '')}
                </div>
                <RadioButton label="No" name={name} value="no" onChange={onChange}/>
                <RadioButton label="Yes" name={name} value="yes" onChange={onChange}/>
            </div>
        </label>
    );
}

YNButton.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func
};

export default YNButton;