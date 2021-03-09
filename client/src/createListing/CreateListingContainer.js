/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.24
 *
 * @Description: Create Listing Container;
 *
 */

import React, {useState, useEffect} from 'react';
import CreateListingControls from "./CreateListingControls";
import MemberHomeShareForm from "./forms/services/MemberHomeShareForm";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {compose} from "redux";
import {connect} from "react-redux";
import has from 'lodash/has';
import {USER_TYPES} from "../common/constants/users";
import InvalidUser from "../common/error/InvalidUser";
import {BUSINESS_SERVICE_CATEGORIES} from "./constants/serviceListingCategoriesText";
import {BUSINESS_CLASSIFIEDS_CATEGORIES} from "./constants/classifiedListingCategoriesText";
import {MEMBER_SERVICE_CATEGORIES} from "./constants/serviceListingCategoriesText";
import CohousingForm from "./forms/services/CohousingForm";
import HomeServiceBusinessForm from "./forms/services/HomeServiceBusinessForm";
import GovernmentServicesForm from "./forms/services/GovernmentServicesForm";
import HouseServicesForm from "./forms/classifieds/HouseServicesForm";
import RentalsForm from "./forms/classifieds/RentalsForm";
import AgenciesForm from "./forms/classifieds/AgenciesForm";
import EventsForm from "./forms/classifieds/EventsForm";
import Paypal, {PAYMENT_STATUS} from "./Paypal";
import {animateScroll as scroll} from 'react-scroll'
import Confirmation from "../common/listings/Confirmation";
import * as ListingService from "../services/ListingService";
import * as UploadService from '../services/UploadService';
import {reset} from "../redux/actionCreators";
import {SESSION_ERR} from "../common/constants/errors";
import {
    getConcatenatedErrorMessage,
    getPhoneNumberFromStrings,
    resolveYesNoToBoolean
} from "../registration/registrationUtils";
import {resolveCategoryToListingType, LISTING_TYPE} from "../common/utils/listingsUtils.js";
import Loading from "../common/loading/Loading";

const CONFIRMATION_TEXT = {
    BUSINESS_LISTINGS: "Your listing has successfully been created and is now pending approval from an administrator.",
    MEMBER_LISTINGS: "Your listing has successfully been created.",
    SESSION_ERR: SESSION_ERR,
    GENERIC_ERROR: 'There was an error creating you listing. Please try again.'
}

const IMAGE_UPLOAD_ERROR = 'An error occurred when uploading the pictures for your listing. Remember files have a ' +
    'maximum size of 2MB';

const mapDispatchToProps = {
    reset,
}

const CreateListingContainer = (props) => {
    const {accountType, authenticated, reset} = props;

    const [displayPayment, setDisplayPayment] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState();
    const [classifiedListing, setClassifiedListing] = useState();
    const [isListingValid, setIsListingValid] = useState();
    const [showConfirmation, setShowConfirmation] = useState();
    const [confirmationMsg, setConfirmationMsg] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedSubcategories, setSelectedSubcategories] = useState();
    const [listingOrderID, setListingOrderID] = useState();
    const [isSelectedSubcategoryEmpty, setIsSelectedSubcategoryEmpty] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const isUserMember = (accountType === USER_TYPES.MEMBER);

    useEffect(() => {
        if (paymentStatus === PAYMENT_STATUS.APPROVED && !isSelectedSubcategoryEmpty) {
            submitListing(classifiedListing)
        }
        if (isListingValid) {
            setShowConfirmation(true)
            setConfirmationMsg(isUserMember ? CONFIRMATION_TEXT.MEMBER_LISTINGS : CONFIRMATION_TEXT.BUSINESS_LISTINGS);
        }
    }, [paymentStatus, isListingValid]);

    function onSubmitServices(listing) {
        setSubmitted(true);
        ((!isSelectedSubcategoryEmpty || isUserMember) && submitListing(listing));

    }

    const onSubmitClassifieds = (listing) => {
        setSubmitted(true);
        if (!isSelectedSubcategoryEmpty) {
            setDisplayPayment(true);
            scroll.scrollToBottom({
                    // set smoothness = https://www.npmjs.com/package/react-scroll
                    smooth: 'easeInOutQuad',
                }
            );
            setClassifiedListing(listing);
        }
    };

    function submitListing(listing) {
        if (!loading) {
            setLoading(true);
            const listingRequestBody = {
                ...listing,
                type: resolveCategoryToListingType(selectedCategory),
                category: selectedCategory,
                ...(selectedCategory === MEMBER_SERVICE_CATEGORIES.MEMBER_HOME) ? {subcategories: []} : {subcategories: selectedSubcategories},
                ...(resolveCategoryToListingType(selectedCategory) === LISTING_TYPE.CLASSIFIED) && {orderId: listingOrderID},
                ...(selectedCategory === BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES || selectedCategory === BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS) && {
                    contactPhoneNumber: getPhoneNumberFromStrings(listing.contactPhoneNumber.first, listing.contactPhoneNumber.middle, listing.contactPhoneNumber.last),
                },
                ...(selectedCategory === BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS) && {
                    petFriendly: resolveYesNoToBoolean(listing.petFriendly),
                    smokeFriendly: resolveYesNoToBoolean(listing.smokeFriendly),
                    furnished: resolveYesNoToBoolean(listing.furnished),
                    monthlyCost: listing.price
                },
                ...(selectedCategory === MEMBER_SERVICE_CATEGORIES.MEMBER_HOME) && {
                    petFriendly: resolveYesNoToBoolean(listing.petFriendly),
                    smokeFriendly: resolveYesNoToBoolean(listing.smokeFriendly),
                    utilitiesIncluded: resolveYesNoToBoolean(listing.utilIncluded),
                }
            }

            ListingService.createListing(listingRequestBody)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        if (listing.pictures) {
                            UploadService.uploadPictures(listing.pictures, data.listing.id)
                                .then(res => res.json())
                                .then(data => {
                                    if ((has('authenticated') && !data.authenticated) || data.err) {
                                        alert(IMAGE_UPLOAD_ERROR);
                                    }
                                })
                                .catch(() => {
                                    alert(IMAGE_UPLOAD_ERROR);
                                });
                        }
                        setIsListingValid(true);
                        setLoading(false);
                    } else if (data.authenticated === false) {
                        reset();
                        setConfirmationMsg(CONFIRMATION_TEXT.SESSION_ERR);
                        setShowConfirmation(true);
                        setLoading(false);
                    } else if (data.errors) {
                        setIsListingValid(false);
                        setLoading(false);
                        alert('Error: ' + getConcatenatedErrorMessage(data.errors));
                    } else if (data.err) {
                        setIsListingValid(false);
                        setLoading(false);
                        alert('Error: ' + data.err);
                    } else {
                        setIsListingValid(false);
                        setLoading(false);
                        setConfirmationMsg(CONFIRMATION_TEXT.GENERIC_ERROR);
                        setShowConfirmation(true);
                    }
                })
                .catch(err => {
                    alert('error creating listing: ' + err.message);
                    setLoading(false);
                });
        }
    }

    const handleSelectedCategory = (category) => {
        setSelectedCategory(category);
        // hide payment section when categories are changed
        setDisplayPayment(false);
    };


    const formToDisplay = (category) => {
        switch (category) {
            case MEMBER_SERVICE_CATEGORIES.MEMBER_HOME:
                return <MemberHomeShareForm onSubmit={onSubmitServices}/>
            case BUSINESS_SERVICE_CATEGORIES.CO_HOUSING:
                return <CohousingForm onSubmit={onSubmitServices}/>
            case BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES:
                return <HomeServiceBusinessForm onSubmit={onSubmitServices} category={selectedCategory}/>;
            case BUSINESS_SERVICE_CATEGORIES.SHARED_BUSINESS_SERVICES:
                return <HomeServiceBusinessForm onSubmit={onSubmitServices} category={selectedCategory}/>;
            case BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES:
                return <GovernmentServicesForm onSubmit={onSubmitServices}/>;
            case BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS:
                return <RentalsForm onSubmit={onSubmitClassifieds}/>;
            case BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD:
                return <HouseServicesForm onSubmit={onSubmitClassifieds}/>;
            case BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES:
                return <AgenciesForm onSubmit={onSubmitClassifieds}/>;
            case BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS:
                return <EventsForm onSubmit={onSubmitClassifieds}/>;
            default:
                return (
                    <div className="flex justify-center items-center h-64 bg-white">
                        <div className="bg-white rounded-lg shadow-2xl">
                            <div className="flex w-96 rounded-lg border-t-8 border-green-600">
                                <div className="p-10 mx-auto w-full">
                                    <h1 className="text-gray-800 h1">
                                        Please Select a Listing Type & Category
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    }

    function showAppropriateResultsPanel() {
        if (loading) {
            scroll.scrollToTop({
                    // set smoothness = https://www.npmjs.com/package/react-scroll
                    smooth: 'easeInOutQuad',
                }
            );
            return <Loading isLoading={loading}/>
        } else {
            return formToDisplay(selectedCategory)
        }
    }

    return (
        <div>
            {/* Checking to Ensure User is authenticated to view this page*/}
            {!authenticated ?
                <InvalidUser message={"You must be a registered member or business to view this page."}/> :

                // Display confirmation if payment went through or services positing is submitted
                !showConfirmation ?
                    <div className={"flex"}>
                        <div className={"flex-none w-1/4 m-6 rounded-xl shadow-xl"}>
                            <CreateListingControls
                                isUserMember={isUserMember}
                                chosenCategory={handleSelectedCategory}
                                chosenSubcategories={setSelectedSubcategories}
                                isSubcategoryEmpty={setIsSelectedSubcategoryEmpty}
                                submitted={submitted}
                            />
                        </div>

                        <div className={"flex-1"}>
                            {showAppropriateResultsPanel()}
                            {displayPayment &&
                            <Paypal
                                paymentStatus={setPaymentStatus}
                                onTransactionOrderIDChange={setListingOrderID}
                            />}
                        </div>
                    </div>
                    : <Confirmation message={confirmationMsg}/>
            }
        </div>
    )
}
const mapStateToProps = (state) => ({
    accountType: state.userPrivileges.accountType,
    authenticated: state.userPrivileges.authenticated
});

CreateListingContainer.propTypes = {
    reset: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    accountType: PropTypes.string
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(CreateListingContainer);