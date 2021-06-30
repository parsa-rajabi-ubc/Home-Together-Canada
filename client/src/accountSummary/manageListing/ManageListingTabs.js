/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.6.10
 *
 * @Description: Manage Listing Tabs
 *
 */

import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {USER_TYPES} from "../../common/constants/users";

export const MANAGE_LISTING_TAB_TEXT = {
    TITLE: "Manage Listings",
    DESCRIPTION: "Use the tabs below to view your listings based on their status.",
    LIVE: "Live Listings",
    INACTIVE: "Inactive Listings",
    NO_LISTING: "No Listings"
}

export const MEMBER_TAB_LABELS = {
    LIVE: "Live",
    INACTIVE: "Inactive",
};

export const BUSINESS_TAB_LABELS = {
    ...MEMBER_TAB_LABELS,
    REJECTED: "Rejected",
    PENDING: "Pending"
}

function ManageListingTabs(props) {
    const {
        setActiveTab,
        accountType
    } = props;

    const [currentTab, setCurrentTab] = useState(MEMBER_TAB_LABELS.LIVE);

    // useEffects
    useEffect(() => {
        setActiveTab(currentTab);
    }, [currentTab])

    const tabs = Object.values(accountType === USER_TYPES.MEMBER ? MEMBER_TAB_LABELS : BUSINESS_TAB_LABELS).map(
        (tab) =>
            <button key={tab}
                    type={"button"}
                    className={tab === currentTab ?
                        `${accountType === USER_TYPES.BUSINESS && "w-1/5"} sub-page-items selected manage-listing-tabs`
                        : `${accountType === USER_TYPES.BUSINESS && "w-1/5"} sub-page-items unselected-tab manage-listing-tabs`}
                    onClick={() => setCurrentTab(tab)}
            >
                {tab + " Listings"}
            </button>
    );

    return (
        <div>
            <h3 className={"account-summary-info-header"}> {MANAGE_LISTING_TAB_TEXT.TITLE} </h3>
            <p className="account-summary-info-text"> {MANAGE_LISTING_TAB_TEXT.DESCRIPTION} </p>
            <div className={"text-center mx-auto my-10"}>
                {tabs}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    accountType: state.userPrivileges.accountType
});

ManageListingTabs.propTypes = {
    setActiveTab: PropTypes.func.isRequired,
    accountType: PropTypes.string.isRequired,
};

export default compose(withRouter, connect(mapStateToProps, null))(ManageListingTabs);