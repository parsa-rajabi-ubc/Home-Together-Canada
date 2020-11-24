/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description:  Re-usable Dropdown Component
 *
 */

import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import propTypes from "prop-types";

function Dropdown(props) {
    const {className, isSearchable, placeholder, options, onChange} = props;

    const [selected, setSelected] = useState("");

    // this code is run every time selected changes
    useEffect(() => {
        onChange(selected);	// this onChange function is the callback from the parent component
        // that can be used to get the value that is inside the dropdown
    }, [selected]);

    return (
        <div>
            <Select className={className} isSearchable={isSearchable} placeholder={placeholder}
                    options={options} value={options.find(obj => obj.label === selected)}
                    onChange={(e) => setSelected(e)}
            />
        </div>
    );
}

Dropdown.propTypes = {
    options: propTypes.array.isRequired,
    className: propTypes.string,
    isSearchable: propTypes.bool,
    placeholder: propTypes.string,
    onChange: propTypes.func
};

export default Dropdown;
