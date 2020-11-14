import React from 'react';
import PropTypes from "prop-types";

//returns generic Checkbox field for a form with a label
export function Checkbox(props){
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