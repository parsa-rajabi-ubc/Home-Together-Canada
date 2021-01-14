/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description: StatusPreference Component for Member Profile with MultiSelect dropdown
 *
 */

import {React,useEffect, useState} from 'react';
import propTypes from "prop-types";
import Dropdown from "./Dropdown";
import {statuses} from "./Status";


function Status(props) {
    const {onChange, dropdownCSS, isDropdownMulti} = props;

    const [selected, setSelected] = useState("");

    const handleInputChange = (e) => {
        let values = [];
                for (let val in e) {
                    values.push(e[val].value);
                }
                setSelected(values);
    }


    useEffect(() => {
        // this onChange function is the callback from the parent component
        onChange(selected);
        console.log(selected);
        // that can be used to get the value that is inside the dropdown
    }, [selected]);

    return (
        <div>
            <Dropdown isSearchable={true} placeholder={"Family Status"}
                      options={statuses}
                      onChange={handleInputChange}
                      dropdownCSS={dropdownCSS}
                      isMulti={isDropdownMulti}
            />
        </div>
    )

}

Status.propTypes = {
    onChange: propTypes.func,
    dropdownCSS: propTypes.object,
    isDropdownMulti: propTypes.bool
};


export default Status;