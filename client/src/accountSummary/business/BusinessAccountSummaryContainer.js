/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.01.21
 *
 * @Description: business account summary
 *
 */

import React, {useState, useEffect} from 'react';
import BusinessAccountSummary from "./BusinessAccountSummary";
import BusinessService from '../../services/BusinessService';
import {prepareBusinessAccountInfo} from "../accountSummaryUtils";

let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3001';
}

const BusinessAccountSummaryContainer = () => {
    const [businessAccount, setBusinessAccountInfo] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        BusinessService.getBusinessAccountInfo()
            .then(res => res.json())
            .then(data => {
                setBusinessAccountInfo(prepareBusinessAccountInfo(data.business));
                setLoading(false);

            })
            .catch(err => {
                console.log('err: ', err.message);
            })
    }, []);

    return (
        <div>
            {!loading && <BusinessAccountSummary {...businessAccount}/>}
        </div>
    );
}

export default BusinessAccountSummaryContainer;
