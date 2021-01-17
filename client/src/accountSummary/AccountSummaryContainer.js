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
import ChangePasswordContainer from "../common/forms/ChangePasswordContainer";
import MemberAccountSummary from "./member/MemberAccountSummary";
import history from "./member/MockData";
import MemberProfileSummary from "./member/MemberProfileSummary";
import Error404 from "../common/error/Error404";

const AccountSummaryContainer = () => {
    const {accountType, selected} = useLocation().state;

    const options = accountType === USER_TYPES.MEMBER ? MEMBER_SUBPAGES : BUSINESS_SUBPAGES;

    const [selectedSubpage, setSelectedSubpage] = useState(selected);

    const subpageComponent = (subpage) => {
        switch (subpage) {
            case ALL_SUBPAGES.PROFILE:
                return accountType === USER_TYPES.MEMBER ? <MemberProfileSummary history={history}/> : <Error404/>
            case ALL_SUBPAGES.PASSWORD:
                return <ChangePasswordContainer/>
            case ALL_SUBPAGES.MESSAGING:
                return <div>Messaging Component</div>
            case ALL_SUBPAGES.MANAGE_LISTINGS:
                return <div>Manage Listings Component</div>
            default:
                return accountType === USER_TYPES.MEMBER ? <MemberAccountSummary history={history}/> : <div/>
        }
    }

    return (
        <div>
            <SubPages options={options} selected={selectedSubpage} onClick={setSelectedSubpage}/>
            {subpageComponent(selectedSubpage)}
        </div>
    )
}

export default AccountSummaryContainer;
