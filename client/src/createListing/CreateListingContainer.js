/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.24
 *
 * @Description: Create Listing Container;
 *
 */

import React from 'react';
import CreateListingControls from "./CreateListingControls";
import MemberHomeShareForm from "./forms/services/MemberHomeShareForm";
import CohousingForm from "./forms/services/CohousingForm";

function onSubmit() {

}

const CreateListingContainer = () => {

    return (
        <div className={"sideBar-container grid-cols-8"}>
            <div className={"sideBar col-end-3"}>
                <CreateListingControls/>
            </div>
            <div className={"sideBar-selected-component col-start-3 col-end-10"}>
                <MemberHomeShareForm onSubmit={onSubmit}/>
                <CohousingForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

export default CreateListingContainer;