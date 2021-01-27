/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.12.22
 *
 * @Description: account summary skeleton
 *
 */

import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import SubPages from "./SubPages";
import {ALL_SUBPAGES, BUSINESS_SUBPAGES, MEMBER_SUBPAGES, USER_TYPES} from "../common/constants/users";
import ChangePasswordContainer from "./ChangePasswordContainer";
import MemberAccountSummaryContainer from "./member/MemberAccountSummaryContainer";
import MemberProfileSummaryContainer from "./member/MemberProfileSummaryContainer";
import BusinessAccountSummaryContainer from "./business/BusinessAccountSummaryContainer";
import Error404 from "../common/error/Error404";
import SearchCriteriaContainer from "./member/SearchCriteriaContainer";
import DeactivateAccount from "./accountDeactivateAndDelete/DeactivateAccount";
import DeleteAccount from "./accountDeactivateAndDelete/DeleteAccount"

const AccountSummaryContainer = () => {
    const {accountType, selected} = useLocation().state;

    const options = accountType === USER_TYPES.MEMBER ? MEMBER_SUBPAGES : BUSINESS_SUBPAGES;

    const [selectedSubpage, setSelectedSubpage] = useState(selected);

    const subpageComponent = (subpage) => {
        switch (subpage) {
            case ALL_SUBPAGES.PROFILE:
                return accountType === USER_TYPES.MEMBER
                    ? <MemberProfileSummaryContainer />
                    : <Error404/>
            case ALL_SUBPAGES.SEARCH_CRITERIA:
                return accountType === USER_TYPES.MEMBER ? <SearchCriteriaContainer/> : <Error404/>
            case ALL_SUBPAGES.PASSWORD:
                return <ChangePasswordContainer/>
            case ALL_SUBPAGES.MESSAGING:
                return <div>Messaging Component</div>
            case ALL_SUBPAGES.MANAGE_LISTINGS:
                return <div>Manage Listings Component</div>
            case ALL_SUBPAGES.ACTIVATE_DEACTIVATE:
                return accountType === USER_TYPES.MEMBER ? <DeactivateAccount memberAccountInfo ={memberAccountInfo}/> : <Error404/>
            case ALL_SUBPAGES.DELETE:
                return <DeleteAccount accountInfo = {memberAccountInfo}/>
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
    )
}

export default AccountSummaryContainer;
