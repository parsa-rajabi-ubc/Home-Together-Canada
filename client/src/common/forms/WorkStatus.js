/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.18
 *
 * @Description: Const array for dropdown Component
 *
 */

import React, {useState} from 'react';
import propTypes from "prop-types";
import Dropdown from "./Dropdown";

const workStatuses = [
    {
        label: "Unemployed",
        value: "Unemployed"
    },
    {
        label: "Student",
        value: "Student"
    },
    {
        label: "Part-time",
        value: "Part-time"
    },
    {
        label: "Full-time",
        value: "Full-time"
    },
    {
        label: "Self-employed",
        value: "Self-employed"
    },
    {
        label: "Retired",
        value: "Retired"
    },
    {
        label: "Semi-retired",
        value: "Semi-retired"
    },
    {
        label: "Other",
        value: "Other"
    }
]

function WorkStatus(props) {
    const {givenSelection, onChange, dropdownCSS} = props;
    const [intialSelection, setIntialSelection] = useState({label: givenSelection, value: givenSelection});

    return (
        <div>
            <Dropdown isSearchable={true} placeholder={"Work Status"}
                      options={workStatuses}
                      onChange={onChange}
                      dropdownCSS={dropdownCSS}
                      intialSelection={intialSelection}
            />
        </div>
    )
}

WorkStatus.propTypes = {
    onChange: propTypes.func,
    dropdownCSS: propTypes.object,
    givenSelection: propTypes.string
};
export default WorkStatus;