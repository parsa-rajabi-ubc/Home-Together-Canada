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
import SubmitButton from "../../common/forms/SubmitButton";


const ADMIN_TEXT = {
    TITLE: "Pending Listings",
    INFO: "Use the icons to the right of each listing to approve or reject them",
    CONFIRM_APPROVE: "Are you sure you want to approve listing #",
    CONFIRM_DECLINE: "Are you sure you want to reject listing #"
}

function PendingListingCards(props) {
    const {
        onSubmit,
        listingID,
        setListingID,
        listingStatus,
        setListingStatus,
        pendingListings,
    } = props;

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };
    var subtitle;

    const [modalIsOpen, setIsOpen] = React.useState(false);

    Modal.setAppElement('#root')

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    function approveListing(){
        setIsOpen(false);
        onSubmit();
    }

    const onClickDecision = (decision, listingID) => {
        console.log(decision, listingID);
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
                    <button className={"focus:outline-none"} type="button"
                            onClick={e => onClickDecision(true, listing.id)}>
                        <AiFillCheckCircle
                            className={"text-green-600 hover:text-green-700 hover:cursor-pointer align-top"}
                            size="40"
                        />
                    </button>
                    <button className={"focus:outline-none"} type="button"
                            onClick={e => onClickDecision(false, listing.id)}>
                        <AiFillCloseCircle
                            className={"text-red-600 hover:text-red-700 hover:cursor-pointer align-bottom"}
                            size="40"/>
                    </button>
                </section>
            </div>
    );

    return (
        <div>
            <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>

            <h3 className={"account-summary-info-header"}> {ADMIN_TEXT.TITLE} </h3>
            <p className="account-summary-info-text"> {ADMIN_TEXT.INFO} </p>

            <div className={"ml-10 my-3"}>{listingCards}</div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <p>{listingStatus ? ADMIN_TEXT.CONFIRM_APPROVE : ADMIN_TEXT.CONFIRM_DECLINE}{listingID + "?"} </p>
                <button type={"button"} className="btn bg-gray-500 ml-10 w-2/3 py-2" onClick={closeModal}>
                    Cancel
                </button>
                <SubmitButton
                    inputValue={listingStatus ? "Approve" : "Reject"}
                    className={`${listingStatus ? "btn-green" : "btn-red"} btn ml-10 w-2/3 py-2`}
                    onClick={approveListing}
                />
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