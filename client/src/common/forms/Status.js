/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description: Status Component for Member Profile
 *
 */

import React, {useState} from 'react';
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
    const {givenSelection, onChange, dropdownCSS} = props;
    const [intialSelection, setIntialSelection] = useState({label: givenSelection, value: givenSelection});

    return (
        <div>
            <Dropdown isSearchable={true} placeholder={"Family Status"}
                      options={statuses}
                      onChange={onChange}
                      dropdownCSS={dropdownCSS}
                      intialSelection={intialSelection}
            />
        </div>
    )

}

Status.propTypes = {
    onChange: propTypes.func,
    dropdownCSS: propTypes.object,
    givenSelection: propTypes.string
};


export default Status;