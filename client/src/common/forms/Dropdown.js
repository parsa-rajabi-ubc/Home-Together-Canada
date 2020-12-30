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

const newStyling = {
    control: base => ({
            ...base,
            marginTop: 4,
            borderColor: "#e2e8f0",
            marginBottom: 16,
            paddingTop: 2,
            paddingBottom: 2,
        }
    ),
    menuPortal: base => ({...base, zIndex: 9999}),
}

function Dropdown(props) {
    const {isSearchable, name, placeholder, options, onChange, intialSelection, styling = newStyling} = props;

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
                value={options.find(obj => obj.label === selected)}
                onChange={(e) => setSelected(e)}
                name={name}
                menuPortalTarget={document.body}
                styles={styling}
                theme={theme => ({
                    ...theme,
                    borderRadius: 8,
                    colors: {
                        ...theme.colors,
                        neutral50: '#A0AEBF',  // Placeholder color
                    }
                })}
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
    intialSelection: propTypes.string,
    styling: propTypes.object
};

export default Dropdown;
