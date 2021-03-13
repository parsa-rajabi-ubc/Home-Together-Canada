/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.3.12
 *
 * @Description: Admin Portal Container
 *
 */

import React, {useState} from "react";
import SubPages from "../accountSummary/SubPages";
import {ADMIN_SUBPAGES} from "../common/constants/users";




function AdminContainer() {

    const [selectedSubpage, setSelectedSubpage] = useState();

    const ADMIN_SIDEBAR = [
        {
            label: 'Manage Users',
            value: 'Manage Users'
        },
        {
            label: 'Manage Admins',
            value: 'Manage Admins'
        },
        {
            label: 'Pending Businesses',
            value: 'Pending Businesses'
        },
        {
            label: 'Pending Listings',
            value: 'Pending Listings'
        },
        {
            label: 'Export',
            value: 'Export'
        },

    ];

    const subpageComponent = (subpage) => {
        switch (subpage) {
            case ADMIN_SUBPAGES.MANAGE_USERS:
                return <div>Manage Users</div>;
            case ADMIN_SUBPAGES.MANAGE_ADMINS:
                return <div>Manage Admins</div>;
            case ADMIN_SUBPAGES.PENDING_BUSINESSES:
                return <div>Pending Businesses</div>;
            case ADMIN_SUBPAGES.PENDING_LISTINGS:
                return <div>Pending Listings</div>;
            case ADMIN_SUBPAGES.EXPORT_PAGE:
                return <div>Export Page</div>;
        }
    }

    return (
        <div className={"sideBar-container"}>
            <div className={"sideBar"}>
                <SubPages options={ADMIN_SIDEBAR} selected={selectedSubpage} onClick={setSelectedSubpage}/>
            </div>
            <div className={"sideBar-selected-component"}>
                {subpageComponent(selectedSubpage)}
            </div>
        </div>
    );
}



export default AdminContainer;