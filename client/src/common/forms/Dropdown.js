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
import {dropdownDefaultTheme} from "../../css/dropdownCSSUtil";

function Dropdown(props) {
    const {isSearchable, name, placeholder, options, onChange, intialSelection, dropdownCSS, dropdownTheme = dropdownDefaultTheme} = props;

    const [selected, setSelected] = useState(intialSelection || "");

    // this code is run every time selected changes
    useEffect(() => {
        // this onChange function is the callback from the parent component
        onChange(selected);
        // that can be used to get the value that is inside the dropdown
    }, [selected]);

    return (
        <div>
            <Select
                isSearchable={isSearchable}
                placeholder={placeholder}
                options={options}
                defaultValue={intialSelection}
                value={options.find(obj => obj.label === selected)}
                onChange={(e) => setSelected(e)}
                name={name}
                menuPortalTarget={document.body}
                styles={dropdownCSS}
                theme={dropdownTheme}
            />
        </div>
    );
}

Dropdown.propTypes = {
    options: propTypes.array.isRequired,
    name: propTypes.string,
    isSearchable: propTypes.bool,
    placeholder: propTypes.string,
    onChange: propTypes.func,
    intialSelection: propTypes.object,
    dropdownCSS: propTypes.object,
    dropdownTheme: propTypes.func
};

export default Dropdown;
