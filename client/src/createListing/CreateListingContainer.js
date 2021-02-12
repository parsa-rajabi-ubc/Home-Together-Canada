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

const CreateListingContainer = (props) => {
    const {accountType} = props;

    return (
        <div className={"sideBar-container grid-cols-8"}>
            <div className={"sideBar col-end-3"}>
                <CreateListingControls isUserMember={accountType === USER_TYPES.MEMBER}/>
            </div>
            <div className={"sideBar-selected-component col-start-3 col-end-10"}>
                <MemberHomeShareForm onSubmit={onSubmit}/>
                <CohousingForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    accountType: state.userPrivileges.accountType,
    authenticated: state.userPrivileges.authenticated
});

CreateListingContainer.propTypes = {
    accountType: PropTypes.string.isRequired
}

export default compose(
    withRouter,
    connect(mapStateToProps, null)
)(CreateListingContainer);
