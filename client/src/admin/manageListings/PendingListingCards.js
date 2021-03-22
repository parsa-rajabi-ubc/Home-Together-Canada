/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.3.20
 *
 * @Description: Pending Listing Cards
 *
 */

import React from "react";
import PropTypes from "prop-types";
import BusinessListingCard from "../../searchServicesClassifieds/listingCards/BusinessListingCard";
import {AiFillCheckCircle} from "react-icons/ai";
import {AiFillCloseCircle} from "react-icons/ai";
import Modal from 'react-modal';


const ADMIN_TEXT = {
    TITLE: "Pending Listings",
    INFO: "Use the icons to the right of each listing to approve or reject them",
    CONFIRM_APPROVE: "Are you sure you want to approve listing #",
    CONFIRM_DECLINE: "Are you sure you want to reject listing #"
}

Modal.setAppElement('body')
const customModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: '60px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        borderRadius: '10px',
    }
};

function PendingListingCards(props) {
    const {
        onSubmit,
        listingID,
        setListingID,
        listingStatus,
        setListingStatus,
        pendingListings,
    } = props;

    const [IsModalOpen, setIsModalOpen] = React.useState(false);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function approveListing() {
        closeModal();
        onSubmit();
    }

    const onClickDecision = (decision, listingID) => {
        setListingID(listingID);
        setListingStatus(decision);
        openModal();
    }

    const listingCards = pendingListings.map(
        (listing) =>
            <div className={"flex"} key={listing.id}>
                <section className={"w-full"}>
                    <BusinessListingCard
                        logo={listing.id.toString()}
                        title={listing.title}
                        businessName={listing.businessName}
                        shortDescription={listing.shortDescription}
                        datePosted={listing.createdAt}/>
                </section>
                <section className={"my-8"}>
                    <button
                        className={"focus:outline-none"} type="button"
                        onClick={e => onClickDecision(true, listing.id, e)}>
                        <AiFillCheckCircle
                            id={"approve"}
                            className={"text-green-600 hover:text-green-700 hover:cursor-pointer align-top"}
                            size="40"
                        />
                    </button>
                    <button className={"focus:outline-none"} type="button"
                            onClick={e => onClickDecision(false, listing.id, e)}>
                        <AiFillCloseCircle
                            className={"text-red-600 hover:text-red-700 hover:cursor-pointer align-bottom"}
                            size="40"/>
                    </button>
                </section>
            </div>
    );

    return (
        <div>
            <h3 className={"account-summary-info-header"}> {ADMIN_TEXT.TITLE} </h3>
            <p className="account-summary-info-text"> {ADMIN_TEXT.INFO} </p>

            <div className={"ml-10 my-3"}>{listingCards}</div>
            <Modal
                isOpen={IsModalOpen}
                onRequestClose={closeModal}
                style={customModalStyles}
                contentLabel="Confirm Decision for Listing"
            >
                <h1 className={"text-gray-800 h1"}>{listingStatus ? ADMIN_TEXT.CONFIRM_APPROVE : ADMIN_TEXT.CONFIRM_DECLINE}{listingID + "?"} </h1>
                <section className={"flex pt-10 space-x-10"}>
                    <button type={"button"} className="py-2 w-1/2 bg-gray-500 btn" onClick={closeModal}>
                        Cancel
                    </button>
                    <button type={"submit"}
                            className={`${listingStatus ? "btn-green" : "btn-red"} btn w-1/2 py-2`}
                            onClick={approveListing}
                            value={listingStatus ? "Approve" : "Reject"}
                    >
                        {listingStatus ? "Approve" : "Reject"}
                    </button>
                </section>
            </Modal>
        </div>
    );
}

PendingListingCards.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    listingID: PropTypes.number,
    setListingID: PropTypes.func.isRequired,
    listingStatus: PropTypes.bool,
    setListingStatus: PropTypes.func.isRequired,
    pendingListings: PropTypes.array.isRequired
};

export default PendingListingCards;