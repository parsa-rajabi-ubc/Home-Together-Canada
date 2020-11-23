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
    const [partners, setPartners] = useState(null);
    const [groupMembers, setGroupMembers] = useState(null);

    const handleStatusChange = e => {
        setsSelectedStatus(e.value);
    }

    function checkStatus(selectedStatus){
        if (selectedStatus === "Couple"){
            return <TextArea label={"Partner's username(s)"} onChange={(e)=>{setPartners(e.target.value)}}/>
        } else if (selectedStatus === "Couple With Children"){
            return <TextArea label={"Partner's username(s)"} onChange={(e)=>{setPartners(e.target.value)}}/>
        } else if (selectedStatus === "Existing Group"){
            return <TextArea label={"Group Member's username(s)"} onChange={(e)=>{setGroupMembers(e.target.value)}}/>
        }

    }
    return (
        <div>
            <Select isSearchable={true} placeholder={"Family Status"}
                    options={statuses} value={statuses.find(obj => obj.value === setsSelectedStatus)}
                    onChange={handleStatusChange}/>
            {selectedStatus &&    <div><b>Selected Status: </b> {selectedStatus}</div>}
            {checkStatus(selectedStatus)}
            {setPartners &&    <div><b>Selected Partners: </b> {partners}</div>}
            {setGroupMembers &&    <div><b>Selected Group: </b> {groupMembers}</div>}
        </div>
    )

}
export default Status;