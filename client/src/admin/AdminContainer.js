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
import ManageAdminsContainer from "./manageAdmins/ManageAdminsContainer";
import Confirmation from "../common/listings/Confirmation";
import ManageUsersContainer from "./manageUsers/ManageUsersContainer";
import ExportUsers from "./exportUsers/ExportUsers";
import PendingListingContainer from "./manageListings/PendingListingContainer";

const WELCOME_MESSAGE = "Welcome to the Admin Portal! Use the sidebar to navigate";

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
                return <ManageUsersContainer/>;
            case ADMIN_SUBPAGES.MANAGE_ADMINS:
                return <ManageAdminsContainer/>
            case ADMIN_SUBPAGES.PENDING_BUSINESSES:
                return <div>Pending Businesses</div>;
            case ADMIN_SUBPAGES.PENDING_LISTINGS:
                return <PendingListingContainer/>;
            case ADMIN_SUBPAGES.EXPORT_PAGE:
                return <ExportUsers/>;
        }
    }

    return (
        <div className={"sideBar-container"}>
            <div className={"sideBar"}>
                <SubPages options={ADMIN_SIDEBAR} selected={selectedSubpage} onClick={setSelectedSubpage}/>
            </div>
            <div className={"sideBar-selected-component"}>
                {selectedSubpage ? subpageComponent(selectedSubpage)
                    : <Confirmation
                        message={WELCOME_MESSAGE}
                        displayButton={false}
                    />
                }
            </div>
        </div>
    );
}


export default AdminContainer;