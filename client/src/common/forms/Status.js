import React, { useState } from 'react';
import Select from "react-select";
import TextArea from "./TextArea";
/**
 * @Author:     Jeff Hatton
 * @Created:    2020.11.18
 *
 * @Description: Const array for Dropdown Component
 *
 */


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

function Status() {
    const [selectedStatus, setsSelectedStatus] = useState(null);

    const handleStatusChange = e => {
        setsSelectedStatus(e.value);
    }

    return (
        <div>
            <Select isSearchable={true}
                    options={statuses} value={statuses.find(obj => obj.value === setsSelectedStatus)}
                    onChange={handleStatusChange}/>
            {/*{(selectedStatus === ("Couple") &&*/}
            {/*    <TextArea label="Partner's username(s): " placeholder="Partner's username" disabled={!(status=="Couple")} onChange={(e)=>{setPartners(e.target.value)}}/>}*/}
            {/*    /!*<TextArea label="Group members: " placeholder="usernames (separated by comma)" disabled={!(status=="Existing Group")} onChange={(e)=>{setPartners(e.target.value)}}/>}*!/*/}

            {/*        <div><b>Selected Status: </b> {selectedStatus}</div>*/}

        </div>
    )

}
export default Status;