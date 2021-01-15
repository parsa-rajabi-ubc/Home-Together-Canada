/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.18
 *
 * @Description: Const array for Dropdown Component.
 *
 */

import React, {useState} from 'react';
import Dropdown from "./Dropdown";
import propTypes from "prop-types";

const shareLimits = [
    {
        label: "1 other person",
        value: "1"
    },
    {
        label: "2 other people",
        value: "2"
    },
    {
        label: "3 other people",
        value: "3"
    },
    {
        label: "4 other people",
        value: "4"
    },
    {
        label: "Any number of people",
        value: "-1"
    }
]

function ShareLimit(props) {
    const {givenSelection, onChange, dropdownCSS} = props;
    const [intialSelection, setIntialSelection] = useState({label: givenSelection, value: givenSelection});

    return (
        <div>
            <Dropdown isSearchable={true} placeholder={"Number of People to Share With"}
                      options={shareLimits}
                      intialSelection={intialSelection}
                      onChange={onChange}
                      dropdownCSS={dropdownCSS}
            />
        </div>
    )
}

ShareLimit.propTypes = {
    onChange: propTypes.func,
    dropdownCSS: propTypes.object,
    givenSelection: propTypes.number
};

export default ShareLimit;