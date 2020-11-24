/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.18
 *
 * @Description: Const array for Dropdown Component.
 *
 */

import React, { useState } from 'react';
import Dropdown from "./Dropdown";

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

function ShareLimit() {
    const [selectedLimit, setsSelectedLimit] = useState(null);

    const handleStatusChange = e => {
        setsSelectedLimit(e.value);
    }

    return (
        <div>
            <Dropdown isSearchable={true} placeholder={"Number of People to Share With"}
                    options={shareLimits} value={shareLimits.find(obj => obj.value === setsSelectedLimit)}
                    onChange={handleStatusChange}/>
        </div>
    )

}
export default ShareLimit;