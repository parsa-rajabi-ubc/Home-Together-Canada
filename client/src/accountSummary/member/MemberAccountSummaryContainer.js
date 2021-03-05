/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.01.21
 *
 * @Description: member account summary container
 *
 */

import React, {useState, useEffect} from 'react';
import MemberAccountSummary from "./MemberAccountSummary";
import * as MemberService from '../../services/MemberService';
import {prepareMemberAccountInfo} from "../accountSummaryUtils";

const MemberAccountSummaryContainer = () => {
    const [memberAccount, setMemberAccount] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        MemberService.getMemberAccountInfo()
            .then(res => res.json())
            .then(data => {
                setMemberAccount(prepareMemberAccountInfo(data.member));
                setLoading(false);
            })
    }, [])

    return (
        <div>
            {!loading && <MemberAccountSummary member={memberAccount}/>}
        </div>
    );
}

export default MemberAccountSummaryContainer;
