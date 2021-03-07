/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.12.22
 *
 * @Description: account summary skeleton
 *
 */

import React, {useState} from 'react';
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
import ConversationListContainer from "./member/messaging/ConversationListContainer";
import {mockMessages} from "../mockData/MockMessageData"

const AccountSummaryContainer = props => {
    const { active } = props;
    const {accountType, selected} = useLocation().state;

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

    const [selectedSubpage, setSelectedSubpage] = useState(selected);

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
                return <ConversationListContainer messageData={mockMessages} messageUser="messageMember1"/>
            case ALL_SUBPAGES.MANAGE_LISTINGS:
                return <div>Manage Listings Component</div>
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
