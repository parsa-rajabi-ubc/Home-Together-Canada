/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.05
 *
 * @Description: Checkbox input Form Component
 *
 */

import React from 'react';
import PropTypes from "prop-types";

function Checkbox(props){
    const { label, onChange } = props;
    return(
        <label>
            {label}
            <input type="checkbox" onChange={onChange} />
        </label>
    );
}
Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func
}

export default Checkbox;