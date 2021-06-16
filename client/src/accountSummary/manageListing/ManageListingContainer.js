/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.06.07
 *
 * @Description: Manage Listing Container
 *
 */

import React, {useState, useEffect} from "react";
import * as MemberServices from "../../services/MemberService";
import * as ListingServices from "../../services/ListingService";
import Confirmation from "../../common/listings/Confirmation";
import ManageListingResults from "./ManageListingResults";
import ManageListingTabs, {TAB_LABELS} from "./ManageListingTabs";
import {MANAGE_LISTING_TOAST} from "../../common/constants/ToastText";
import {toast} from "react-toastify";

function ManageListingContainer() {

    const [liveMemberListings, setLiveMemberListings] = useState();
    const [inactiveMemberListings, setInactiveMemberListings] = useState();
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
                setLiveMemberListings(data.liveListings)

            })
    }

    function getInactiveMemberListings() {
        MemberServices.getInactiveMemberListings()
            .then(res => res.json())
            .then(data => {
                setInactiveMemberListings(data.inactiveListing)
            })
    }

    const deleteListing = (listingID) => {
        const deleteListingRequestBody = {
            listingId: listingID
        }
        ListingServices.deleteListing(deleteListingRequestBody)
            .then(res => res.json())
            .then(data => {
                if(data.success){
                    toast.success(MANAGE_LISTING_TOAST.LISTING_ID + viewableListingTitle + MANAGE_LISTING_TOAST.DELETED);
                } else {
                    toast.error(MANAGE_LISTING_TOAST.ERROR);
                }
            })
            .catch(err => {
                toast.error(err.message);
            })
    }

    const onSubmit = (listingID) => {
        deleteListing(listingID);
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
                    onSubmit={onSubmit}
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