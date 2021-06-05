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
import Confirmation from "../../common/listings/Confirmation";


toast.configure()

const NO_LISTINGS = "No pending listings available";

function PendingListingContainer() {
    const [listingID, setListingID] = useState();
    const [listingStatus, setListingStatus] = useState();
    const [pendingListings, setPendingListings] = useState([]);


    // useEffects
    useEffect(() => {
        getAllPendingListings();
    }, [])


    const getAllPendingListings = () => {
        AdminService.getAllPendingListings()
            .then(res => res.json())
            .then(data => {
                setPendingListings(data.compiledListingInfo);
            })
    }

    const onSubmit = () => {

        const listingStatusBody = {
            listingId: listingID,
            approve: listingStatus,
        }

        AdminService.updateListingStatus(listingStatusBody)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    getAllPendingListings();
                    if (listingStatus) {
                        toast.success(ADMIN_TOAST.LISTING_ID + listingID + ADMIN_TOAST.PENDING_LISTING_APPROVED, {
                            position: "bottom-center",
                            autoClose: 8000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: false,
                            transition: Flip
                        });
                    } else {
                        toast.info(ADMIN_TOAST.LISTING_ID + listingID + ADMIN_TOAST.PENDING_LISTING_REJECTED, {
                            position: "bottom-center",
                            autoClose: 8000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: false,
                            transition: Flip
                        });
                    }

                } else if (data.err) {
                    alert('Error: ' + data.err);

                } else if (data.errors) {
                    const errorMessage = getConcatenatedErrorMessage(data.errors);
                    // show list of all errors
                    alert(errorMessage);
                }
            })
            .catch(err => {
                alert('Error: ' + err.message);
            });

    }
    return (
        <div>
            {(!pendingListings || !pendingListings.length) ?
                <Confirmation message={NO_LISTINGS} displayButton={false} errorColor={true}/>
                :
                <PendingListingCards
                    onSubmit={onSubmit}
                    listingID={listingID}
                    setListingID={setListingID}
                    listingStatus={listingStatus}
                    setListingStatus={setListingStatus}
                    pendingListings={pendingListings}
                />
            }
        </div>
    );
}


export default PendingListingContainer;