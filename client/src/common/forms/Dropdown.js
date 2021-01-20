/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description:  Re-usable Dropdown Component
 *
 */

import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import propTypes from "prop-types";
import {dropdownDefaultTheme} from "../../css/dropdownCSSUtil";
import {
    getSelectedOptionForSingleSelect,
    getSelectedOptionsForMultiSelect
} from "../utils/dropdownUtils";

function Dropdown(props) {
    const {
        isSearchable,
        name,
        placeholder,
        options,
        onChange,
        initialSelection,
        isMulti = false,
        dropdownCSS,
        currentSelectedValue,
        dropdownTheme = dropdownDefaultTheme
    } = props;

    // currentSelectedValue and related functions/constants/hooks are used to update the
    // values in the Dropdown from the parent component
    const prefilledDropdownSelection = isMulti
        ? getSelectedOptionsForMultiSelect(currentSelectedValue, options)
        : getSelectedOptionForSingleSelect(currentSelectedValue, options);

    const [selected, setSelected] = useState(initialSelection || prefilledDropdownSelection || "");

    useEffect(() => {
        if(isMulti) {
            setSelected(getSelectedOptionsForMultiSelect(currentSelectedValue, options));
        } else {
            setSelected(getSelectedOptionForSingleSelect(currentSelectedValue, options));
        }
    }, [currentSelectedValue]);

    const onDropdownChange = e => {
        onChange(e);
        setSelected(e);
    }

    return (
        <div>
            <Select
                isSearchable={isSearchable}
                isClearable={false}
                isMulti={isMulti}
                placeholder={placeholder}
                options={options}
                value={selected}
                onChange={onDropdownChange}
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
    initialSelection: propTypes.shape({
        label: propTypes.oneOfType([propTypes.string, propTypes.number]),
        value: propTypes.oneOfType([propTypes.string, propTypes.number])
    }),
    currentSelectedValue: propTypes.any,
    dropdownCSS: propTypes.object,
    dropdownTheme: propTypes.func,
    isMulti: propTypes.bool
};

export default Dropdown;
