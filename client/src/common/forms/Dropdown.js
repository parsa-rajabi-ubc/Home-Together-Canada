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

function Dropdown(props){
    const {isSearchable, placeholder, options, onChange} = props;

    const [selected, setSelected] = useState("");

    // this code is run every time selected changes
    useEffect(() => {
        onChange(selected);	// this onChange function is the callback from the parent component
        // that can be used to get the value that is inside the dropdown
        console.log("selected: ", selected)
    }, [selected]);

    return (
        <div>
            <Select isSearchable={isSearchable} placeholder={placeholder}
                    options={options} value={options.find(obj => obj.label === selected)}
                    onChange={(e) => setSelected(e)}
            />
        </div>
    );
}

Dropdown.propTypes = {
    isSearchable: propTypes.bool,
    placeholder: propTypes.string,
    options: propTypes.any,
    onChange : propTypes.func
};

export default Dropdown;
