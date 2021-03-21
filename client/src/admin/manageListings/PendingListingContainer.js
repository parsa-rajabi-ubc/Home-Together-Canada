/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.3.20
 *
 * @Description: Pending Listing Container
 *
 */

import React, {useEffect, useState} from "react";
import PendingListingCards from "./PendingListingCards";
import * as AdminService from "../../services/AdminService";
import {
    getConcatenatedErrorMessage,
} from "../../registration/registrationUtils";
import {Flip, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {ADMIN_TOAST} from "../../common/constants/ToastText";


toast.configure()

function PendingListingContainer() {
    const [listingID, setListingID] = useState();
    const [listingStatus, setListingStatus] = useState();
    const [pendingListings, setPendingListings] = useState([]);


    // useEffects
    useEffect(() => {
        getAllPendingListings();
        console.log("listingStatus is ", listingStatus);
    }, [])


    const getAllPendingListings = () => {
        AdminService.getAllPendingListings()
            .then(res => res.json())
            .then(data => {
                setPendingListings(data.compiledListingInfo);
                console.table(data.compiledListingInfo);
            })
    }
    const isSearchValid = () => {

    }
    const onSubmit = () => {

        const listingStatusBody = {
            listingID: listingID,
            approve: listingStatus,
        }

        console.log(JSON.stringify(listingStatusBody));
        toast.success(ADMIN_TOAST.LISTING_ID + listingID + ADMIN_TOAST.PENDING_LISTING_APPROVED, {
            toastId: "successToast",
            position: "bottom-center",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: false,
            transition: Flip
        });
        // AdminService.updateListingStatus(listingStatusBody)
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data) {
        //             console.log("approved!")
        //
        //         } else if (data.err) {
        //             alert('Error: ' + data.err);
        //
        //         } else if (data.errors) {
        //             const errorMessage = getConcatenatedErrorMessage(data.errors);
        //             // show list of all errors
        //             alert(errorMessage);
        //         }
        //     })
        //     .catch(err => {
        //         alert('Error: ' + err.message);
        //     });

    }
    return (
        <div>
            <PendingListingCards
                onSubmit={onSubmit}
                listingID={listingID}
                setListingID={setListingID}
                listingStatus={listingStatus}
                setListingStatus={setListingStatus}
                pendingListings={pendingListings}

            />
        </div>
    );
}


export default PendingListingContainer;