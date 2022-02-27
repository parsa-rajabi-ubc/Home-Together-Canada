/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.6.9
 *
 * @Description: Manage Listing Cards
 *
 */

import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {MdDeleteForever} from "react-icons/md";
import Modal from 'react-modal';
import {MEMBER_TAB_LABELS, BUSINESS_TAB_LABELS} from "./ManageListingTabs";
import MemberListingCard from "../../searchServicesClassifieds/listingCards/MemberListingCard";
import Paginate from "../../common/forms/Paginate";
import {customModalStyles} from "../../css/ModelCSSUtil";
import {USER_TYPES} from "../../common/constants/users";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import BusinessListingCard from "../../searchServicesClassifieds/listingCards/BusinessListingCard";
import {getImageURL} from "../../common/utils/imageUtils";
import Confirmation from "../../common/listings/Confirmation";

const MANAGE_LISTING_TEXT = {
    TITLE: "Manage Listings",
    DESCRIPTION: "Use the tabs below to view your listings based on their status.",
    NO_LISTING: "No ",
    CONFIRM_DELETE: "Are you sure you want to delete listing \"",
    DELETE: "Delete",
    CANCEL: "Cancel"
}

const NUM_RESULTS = 7;
Modal.setAppElement('body');

function ManageListingResults(props) {
    const {
        onSubmit,
        viewableListingData,
        activeTab,
        setViewableListingTitle,
        accountType
    } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [listingID, setListingID] = useState();
    const [listingTitle, setListingTitle] = useState();
    const [cardData, setCardData] = useState();

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function deleteListing() {
        closeModal();
        onSubmit(listingID);
    }

    const onClickDecision = (listingID, listingTitle) => {
        setListingID(listingID);
        setListingTitle(listingTitle);
        setViewableListingTitle(listingTitle);
        openModal();
    }


    useEffect(() => {
        if (viewableListingData) {
            if (accountType === USER_TYPES.MEMBER) {
                setCardData(viewableListingData.map(
                    (listing) =>
                        <div className={"flex"} key={listing.id}>
                            <section className={"w-full"}>
                                <Link
                                    to={{
                                        pathname: `/listing/edit/${listing.id}`,
                                    }}
                                    state={{ listing: listing }}
                                    key={listing.id}
                                >
                                    <MemberListingCard
                                        title={listing.title}
                                        monthlyCost={listing.monthlyCost}
                                        petFriendly={listing.petFriendly}
                                        smokeFriendly={listing.smokeFriendly}
                                        shortDescription={listing.shortDescription}
                                        datePosted={listing.createdAt}
                                    />
                                </Link>
                            </section>

                            {/* only show delete button (garbage can) when the listing status is LIVE */}
                            {activeTab === MEMBER_TAB_LABELS.LIVE &&
                            <section className={"my-8"}>
                                <MdDeleteForever
                                    color="#DB4437"
                                    size="40"
                                    onClick={() => onClickDecision(listing.id, listing.title)}
                                />
                            </section>
                            }
                        </div>
                ));
                setLoading(false);
            } else if (accountType === USER_TYPES.BUSINESS) {
                setCardData(viewableListingData.map(
                    (listing) =>
                        <div className={"flex"} key={listing.id}>
                            <section className={"w-full"}>
                                <Link
                                    to={{
                                        pathname: `/listing/edit/${listing.id}`,
                                    }}
                                    state={{ listing: listing }}
                                    key={listing.id}
                                >
                                    <BusinessListingCard
                                        logo={listing.logo && getImageURL(listing.logo)}
                                        title={listing.title}
                                        businessName={listing.businessName}
                                        shortDescription={listing.shortDescription}
                                        datePosted={listing.createdAt}
                                    />
                                </Link>
                            </section>

                            {/* only show delete button (garbage can) when the listing status is LIVE */}
                            {activeTab === BUSINESS_TAB_LABELS.LIVE &&
                            <section className={"my-8"}>
                                <MdDeleteForever
                                    color="#DB4437"
                                    size="40"
                                    onClick={() => onClickDecision(listing.id, listing.title)}
                                />
                            </section>
                            }
                        </div>
                ));
                setLoading(false);
            }
        }
    }, [viewableListingData]);

    return (
        <div>
            {(!viewableListingData || !viewableListingData.length) ?
                <Confirmation
                    displayButton={false}
                    errorColor={true} message={"No " + activeTab + " Listings"}
                    minHeight={false}
                />
                : (!loading && <Paginate data={cardData} resultsPerPage={NUM_RESULTS}/>
                )}

            {viewableListingData && <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customModalStyles}
                contentLabel="Confirm Decision for Listing"
            >

                <h1 className={"text-gray-800 h1"}>{MANAGE_LISTING_TEXT.CONFIRM_DELETE}{listingTitle + "\"?"} </h1>
                <section className={"flex pt-10 space-x-10"}>
                    <button type={"button"} className="py-2 w-1/2 bg-gray-500 btn" onClick={closeModal}>
                        {MANAGE_LISTING_TEXT.CANCEL}
                    </button>
                    <button
                        type={"submit"}
                        className={"btn-red btn w-1/2 py-2"}
                        onClick={deleteListing}
                        value={MANAGE_LISTING_TEXT.DELETE}
                    >
                        {MANAGE_LISTING_TEXT.DELETE}
                    </button>
                </section>
            </Modal>
            }
        </div>
    );
}

const mapStateToProps = state => ({
    accountType: state.userPrivileges.accountType
});

ManageListingResults.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    accountType: PropTypes.string.isRequired,
    viewableListingData: PropTypes.array,
    activeTab: PropTypes.string,
    setViewableListingTitle: PropTypes.func,
};

export default compose(connect(mapStateToProps, null))(ManageListingResults);