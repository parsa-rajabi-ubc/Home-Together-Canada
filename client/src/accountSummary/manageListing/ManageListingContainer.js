/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.06.07
 *
 * @Description: Manage Listing Container
 *
 */

import React, {useState, useEffect} from "react";
import * as MemberServices from "../../services/MemberService";
import * as BusinessServices from "../../services/BusinessService";
import * as ListingServices from "../../services/ListingService";
import Confirmation from "../../common/listings/Confirmation";
import ManageListingResults from "./ManageListingResults";
import ManageListingTabs, {TAB_LABELS} from "./ManageListingTabs";
import {MANAGE_LISTING_TOAST} from "../../common/constants/ToastText";
import {toast} from "react-toastify";

function ManageListingContainer() {

    const [liveMemberListings, setLiveMemberListings] = useState();
    const [inactiveMemberListings, setInactiveMemberListings] = useState();

    const [liveBusinessListings, setLiveBusinessListings] = useState();
    const [inactiveBusinessListings, setInactiveBusinessListings] = useState();
    const [rejectedBusinessListings, setRejectedBusinessListings] = useState();

    const [selectedTab, setSelectedTab] = useState();
    const [viewableListingData, setViewableListingData] = useState();
    const [viewableListingTitle, setViewableListingTitle] = useState();

    // useEffects
    useEffect(() => {
        getLiveMemberListings();
        getInactiveMemberListings();
    }, [])

    // useEffects
    useEffect(() => {
        updateListingData();
    }, [selectedTab])


    function updateListingData() {
        switch (selectedTab) {
            case TAB_LABELS.LIVE:
                setViewableListingData(liveMemberListings);
                break;
            case TAB_LABELS.INACTIVE:
                setViewableListingData(inactiveMemberListings);
                break;
        }
    }

    function getLiveMemberListings() {
        MemberServices.getLiveMemberListings()
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setLiveMemberListings(data.liveListings);
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
                    setInactiveMemberListings(data.inactiveListing);
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
                    setLiveBusinessListings(data.liveListings);
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
                    setInactiveBusinessListings(data.inactiveListing);
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
                    setRejectedBusinessListings(data.inactiveListing);
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

            {/* Display cards once user has selected a tab i.e selectedTab has a value */}
            {(!viewableListingData || !viewableListingData.length) && selectedTab ?
                <Confirmation displayButton={false} errorColor={true} message={"No " + selectedTab + " Listings"}
                              minHeight={false}/>
                : <ManageListingResults
                    onSubmit={deleteListing}
                    activeTab={selectedTab}
                    viewableListingData={viewableListingData}
                    setViewableListingData={setViewableListingTitle}
                />

            }
        </div>
    );
}

ManageListingContainer.propTypes = {}

export default ManageListingContainer;