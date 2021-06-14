/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.06.07
 *
 * @Description: Manage Listing Container
 *
 */

import React, {useState, useEffect} from "react";
import 'react-tabs/style/react-tabs.css';
import * as MemberServices from "../../services/MemberService";
import * as ListingServices from "../../services/ListingService";
import Confirmation from "../../common/listings/Confirmation";
import ManageListing from "./ManageListing";
import ManageListingTabs, {TAB_LABELS} from "./ManageListingTabs";

function ManageListingContainer() {

    const [liveMemberListings, setLiveMemberListings] = useState();
    const [inactiveMemberListings, setInactiveMemberListings] = useState();
    const [listingStatus, setListingStatus] = useState();
    const [activeTab, setActiveTab] = useState();
    const [listingData, setListingData] = useState();

    // useEffects
    useEffect(() => {
        getLiveMemberListings();
        getInactiveMemberListings();
    }, [])

    // useEffects
    useEffect(() => {
        updateListingData();
    }, [activeTab])


    function updateListingData() {
        switch (activeTab) {
            case TAB_LABELS[0]:
                setListingData(liveMemberListings);
                break;
            case TAB_LABELS[1]:
                setListingData(inactiveMemberListings);
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

            })
            .catch(err => {
                alert('Error' + err.message);
            })
    }

    const onSubmit = (listingID) => {
        deleteListing(listingID);
    }

    return (
        <div>
            <ManageListingTabs
                setActiveTab={setActiveTab}
            />

            {/* Display cards once user has selected a tab i.e activeTab has a value */}
            {(!listingData || !listingData.length) && activeTab ?
                <Confirmation displayButton={false} errorColor={true} message={"No " + activeTab + " Listings"}
                              minHeight={false}/>
                : <ManageListing
                    onSubmit={onSubmit}
                    listingStatus={listingStatus}
                    setListingStatus={setListingStatus}
                    activeTab={activeTab}
                    listingData={listingData}/>

            }
        </div>
    );
}

ManageListingContainer.propTypes = {}

export default ManageListingContainer;