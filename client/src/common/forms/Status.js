import React, {useState} from 'react';
import TextArea from "./TextArea";
import Dropdown from "./Dropdown";

/**
 * @Author:     Parsa Rajabi
 * @Created:    2020.11.23
 *
 * @Description: Status Component for Member Profile
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

    function checkStatus(selectedStatus) {
        if (selectedStatus === "Couple") {
            return <TextArea label={"Partner's username(s)"} onChange={(e) => {
                setPartners(e.target.value)
            }}/>
        } else if (selectedStatus === "Couple With Children") {
            return <TextArea label={"Partner's username(s)"} onChange={(e) => {
                setPartners(e.target.value)
            }}/>
        } else if (selectedStatus === "Existing Group") {
            return <TextArea label={"Group Member's username(s)"} onChange={(e) => {
                setGroupMembers(e.target.value)
            }}/>
        }

    }

    return (
        <div>
            <Dropdown isSearchable={true} placeholder={"Family Status"}
                      options={statuses}
                      onChange={handleStatusChange}/>
            {checkStatus(selectedStatus)}
        </div>
    )

}

export default Status;