/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.12.22
 *
 * @Description: account summary skeleton
 *
 */

import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SubPages from "./SubPages";
import {ALL_SUBPAGES, BUSINESS_SUBPAGES, MEMBER_SUBPAGES, USER_TYPES} from "../common/constants/users";
import ChangePasswordContainer from "./ChangePasswordContainer";
import MemberAccountSummaryContainer from "./member/MemberAccountSummaryContainer";
import MemberProfileSummaryContainer from "./member/MemberProfileSummaryContainer";
import BusinessAccountSummaryContainer from "./business/BusinessAccountSummaryContainer";
import Error404 from "../common/error/Error404";
import SearchCriteriaContainer from "./member/SearchCriteriaContainer";
import DeactivateAccountContainer from './accountDeactivateAndDelete/DeactivateAccountContainer'
import DeleteAccountContainer from "./accountDeactivateAndDelete/DeleteAccountContainer";
import MessagingContainer from "./member/messaging/MessagingContainer";
import ManageListingContainer from "./manageListing/ManageListingContainer";
import {
    cohousingMock,
    governmentAgencyMock, houseYardMock,
    memberHomeShareMock, rentalMock,
    sharedHomeServicesMock
} from "./manageListings/mocks/serviceListingMocks";
import EditListingContainer from "./manageListings/EditListingContainer";

const AccountSummaryContainer = props => {
    const { active } = props;
    const {accountType, selected} = useLocation().state;
    const [selectedSubpage, setSelectedSubpage] = useState(selected);

    useEffect(() => {
        setSelectedSubpage(selected);
    }, [selected])

    const MEMBER_SIDEBAR = [
        ...MEMBER_SUBPAGES,
        ...active
            ? [{
                label: 'Deactivate Account',
                value: 'Deactivate Account'
            }]
            : [{
                label: 'Activate Account',
                value: 'Activate Account'
            }],
        {
            label: 'Delete Account',
            value: 'Delete Account'
        }
    ];

    const BUSINESS_SIDEBAR = [
        ...BUSINESS_SUBPAGES,
        {
            label: 'Delete Account',
            value: 'Delete Account'
        }
    ];

    const options = accountType === USER_TYPES.MEMBER ? MEMBER_SIDEBAR : BUSINESS_SIDEBAR;

    const memberHomeShareListing = {
        ...memberHomeShareMock
    };

    const cohousingListing = {
        ...cohousingMock
    }

    const sharedServiceListing = {
        ...sharedHomeServicesMock
    }

    const governmentListing = {
        ...governmentAgencyMock
    }

    const rentalListing = {
        ...rentalMock
    }

    const houseYardListing = {
        ...houseYardMock
    }

    const subpageComponent = (subpage) => {
        switch (subpage) {
            case ALL_SUBPAGES.PROFILE:
                return accountType === USER_TYPES.MEMBER
                    ? <MemberProfileSummaryContainer/>
                    : <Error404/>
            case ALL_SUBPAGES.SEARCH_CRITERIA:
                return accountType === USER_TYPES.MEMBER ?
                    <SearchCriteriaContainer/>
                    : <Error404/>
            case ALL_SUBPAGES.PASSWORD:
                return <ChangePasswordContainer/>
            case ALL_SUBPAGES.MESSAGING:
                return <MessagingContainer/>
            case ALL_SUBPAGES.MANAGE_LISTINGS:
                return <ManageListingContainer/>
            case ALL_SUBPAGES.ACTIVATE:
                return accountType === USER_TYPES.MEMBER ?
                    <DeactivateAccountContainer/>
                    : <Error404/>
            case ALL_SUBPAGES.DEACTIVATE:
                return accountType === USER_TYPES.MEMBER ?
                    <DeactivateAccountContainer/>
                    : <Error404/>
            case ALL_SUBPAGES.DELETE:
                return <DeleteAccountContainer/>
            default:
                return accountType === USER_TYPES.MEMBER
                    ? <MemberAccountSummaryContainer/>
                    : <BusinessAccountSummaryContainer/>
        }
    }

    return (
        <div className={"sideBar-container"}>
            <div className={"sideBar"}>
                <SubPages options={options} selected={selectedSubpage} onClick={setSelectedSubpage}/>
            </div>
            <div className={"sideBar-selected-component"}>
                {subpageComponent(selectedSubpage)}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    active: state.memberPrivileges.active
});

AccountSummaryContainer.propTypes = {
    active: PropTypes.bool
}

export default connect(mapStateToProps, null)(AccountSummaryContainer);
