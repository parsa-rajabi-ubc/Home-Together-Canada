/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description: Status Component for Member Profile
 *
 */

import {React,useEffect, useState} from 'react';
import propTypes from "prop-types";
import Dropdown from "./Dropdown";

const statuses = [
    {
        label: "Single",
        value: "Single"
    },
    {
        label: "Couple",
        value: "Couple"
    },
    {
        label: "Couple With Children",
        value: "Couple With Children"
    },
    {
        label: "Single Parent",
        value: "Single Parent"
    },
    {
        label: "Existing Group",
        value: "Existing Group"
    }
]


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

    {isDropdownMulti && useEffect(() => {
        // this onChange function is the callback from the parent component
        onChange(selected);
        // that can be used to get the value that is inside the dropdown
    }, [selected]);}

    return (
        <div>
            <Dropdown isSearchable={true} placeholder={"Family Status"}
                      options={statuses}
                      onChange={isDropdownMulti ? handleInputChange : onChange}
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