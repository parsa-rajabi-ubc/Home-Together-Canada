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

export const MANAGE_LISTING_TAB_TEXT = {
    TITLE: "Manage Listings",
    DESCRIPTION: "Use the tabs below to view your listings based on their status.",
    LIVE: "Live Listings",
    INACTIVE: "Inactive Listings",
    NO_LISTING: "No Listings"
}

export const TAB_LABELS = [
    "Live",
    "Inactive",
];

function ManageListingTabs(props) {
    const {
        setActiveTab,
    } = props;
    // initialize current tab to 0 ie. live listings
    const [currentTab, setCurrentTab] = useState();

    // useEffects
    useEffect(() => {
        setActiveTab(currentTab);
    }, [currentTab])



    const tabs = TAB_LABELS.map(
        (tab) =>
            <button key={tab} type={"button"}
                    className={tab === currentTab ? "sub-page-items selected w-1/3 rounded-full shadow-md border-2 focus:outline-none" : "sub-page-items w-1/3 rounded-full shadow-md border-2 border-green-300 focus:outline-none"}
                    onClick={() => setCurrentTab(tab)}>
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

ManageListingTabs.propTypes = {
    setActiveTab: PropTypes.func,
};

export default ManageListingTabs;