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
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {compose} from "redux";
import {connect} from "react-redux";
import {USER_TYPES} from "../common/constants/users";
import InvalidUser from "../common/error/InvalidUser";
import CohousingForm from "./forms/services/CohousingForm";

function onSubmit() {

}

const CreateListingContainer = (props) => {
    const {accountType, authenticated} = props;

    return (
        <div>
            {/* Checking to Ensure User is authenticated to view this page*/}
            {!authenticated ? <InvalidUser message={"You must be a registered member or business to view this page."}/> :
                // Display Container if the user is logged in as member or business
                <div className={"sideBar-container grid-cols-8"}>
                    <div className={"sideBar col-end-3"}>
                        <CreateListingControls isUserMember={accountType === USER_TYPES.MEMBER}/>
                    </div>
                    <div className={"sideBar-selected-component col-start-3 col-end-10"}>
                        <MemberHomeShareForm onSubmit={onSubmit}/>
                        {/*<CohousingForm onSubmit={onSubmit}/>*/}
                    </div>
                </div>}
        </div>
    )
}
const mapStateToProps = (state) => ({
    accountType: state.userPrivileges.accountType,
    authenticated: state.userPrivileges.authenticated
});

CreateListingContainer.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    accountType: PropTypes.string
}

export default compose(
    withRouter,
    connect(mapStateToProps, null)
)(CreateListingContainer);
