/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.06.07
 *
 * @Description: Manage Listing Container
 *
 */

import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import * as MemberServices from "../../services/MemberService";
import * as BusinessServices from "../../services/BusinessService";
import * as ListingServices from "../../services/ListingService";
import ManageListingResults from "./ManageListingResults";
import ManageListingTabs, {BUSINESS_TAB_LABELS, MEMBER_TAB_LABELS} from "./ManageListingTabs";
import {MANAGE_LISTING_TOAST} from "../../common/constants/ToastText";
import {toast} from "react-toastify";
import {withRouter} from "react-router-dom";
import {USER_TYPES} from "../../common/constants/users";
import {compose} from "redux";
import {connect} from "react-redux";
import Loading from "../../common/loading/Loading";

function ManageListingContainer(props) {
    const {accountType} = props;

    const [selectedTab, setSelectedTab] = useState(MEMBER_TAB_LABELS.LIVE);
    const [viewableListingData, setViewableListingData] = useState();
    const [viewableListingTitle, setViewableListingTitle] = useState();

    const [loading, setLoading] = useState(true);

    // useEffects
    useEffect(() => {
        updateListingData();
    }, [selectedTab])


    function updateListingData() {
        if (accountType === USER_TYPES.MEMBER) {
            switch (selectedTab) {
                case MEMBER_TAB_LABELS.LIVE:
                    getLiveMemberListings();
                    break;
                case MEMBER_TAB_LABELS.INACTIVE:
                    getInactiveMemberListings();
                    break;
            }
        } else if (accountType === USER_TYPES.BUSINESS) {
            switch (selectedTab) {
                case BUSINESS_TAB_LABELS.LIVE:
                    getLiveBusinessListings()
                    break;
                case BUSINESS_TAB_LABELS.INACTIVE:
                    getInactiveBusinessListings();
                    break;
                case BUSINESS_TAB_LABELS.REJECTED:
                    getRejectedBusinessListings();
                    break;
                case BUSINESS_TAB_LABELS.PENDING:
                    getPendingBusinessListings();
                    break;
            }
        }
        setLoading(false);
    }

    function getLiveMemberListings() {
        MemberServices.getLiveMemberListings()
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setViewableListingData(data.liveListings);
                } else if (data.err) {
                    toast.error(data.err);
                }
            }).catch(err => {
            toast.error(err.message);
        });
    }

    function getInactiveMemberListings() {
        MemberServices.getInactiveMemberListings()
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setViewableListingData(data.inactiveListing);
                } else if (data.err) {
                    toast.error(data.err);
                }
            }).catch(err => {
            toast.error(err.message);
        });
    }

    function getLiveBusinessListings() {
        BusinessServices.getLiveBusinessListings()
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setViewableListingData(data.liveListings);
                } else if (data.err) {
                    toast.error(data.err);
                }
            }).catch(err => {
            toast.error(err.message);
        });
    }

    function getInactiveBusinessListings() {
        BusinessServices.getInactiveBusinessListings()
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setViewableListingData(data.inactiveListings)
                } else if (data.err) {
                    toast.error(data.err);
                }
            }).catch(err => {
            toast.error(err.message);
        });
    }

    function getRejectedBusinessListings() {
        BusinessServices.getRejectedBusinessListings()
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setViewableListingData(data.rejectedListings);
                } else if (data.err) {
                    toast.error(data.err);
                }
            }).catch(err => {
            toast.error(err.message);
        });
    }


    function getPendingBusinessListings() {
        BusinessServices.getPendingBusinessListings()
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setViewableListingData(data.pendingListings);
                } else if (data.err) {
                    toast.error(data.err);
                }
            }).catch(err => {
            toast.error(err.message);
        });
    }

    const deleteListing = (listingID) => {
        const deleteListingRequestBody = {
            listingId: listingID
        }
        ListingServices.deleteListing(deleteListingRequestBody)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success(MANAGE_LISTING_TOAST.LISTING_ID + viewableListingTitle + MANAGE_LISTING_TOAST.DELETED);
                    // update listing cards after a listing has been deleted
                    updateListingData();
                } else {
                    toast.error(MANAGE_LISTING_TOAST.ERROR);
                }
            })
            .catch(err => {
                toast.error(err.message);
            })
    }

    return (
        <div>
            <ManageListingTabs
                setActiveTab={setSelectedTab}
            />
            {/* Display loading if screen is loading, display cards if there is card data & tab has been selected */}
            {(loading ? <Loading isLoading={loading}/> :
                    (viewableListingData && selectedTab) && <ManageListingResults
                                                                onSubmit={deleteListing}
                                                                activeTab={selectedTab}
                                                                viewableListingData={(!loading && viewableListingData)}
                                                                setViewableListingTitle={setViewableListingTitle}
                                                            />
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    accountType: state.userPrivileges.accountType
});

ManageListingContainer.propTypes = {
    accountType: PropTypes.string.isRequired,
}

export default compose(withRouter, connect(mapStateToProps, null))(ManageListingContainer);