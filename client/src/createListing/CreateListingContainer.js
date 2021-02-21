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

const CONFIRMATION_TEXT = {
    BUSINESS_LISTINGS: "Your listing has successfully been created and is now pending approval from an administrator.",
    MEMBER_LISTINGS: "Your listing has successfully been created."
}

const CreateListingContainer = (props) => {
    const {accountType, authenticated} = props;
    const [displayPayment, setDisplayPayment] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState();
    const [showConfirmation, setShowConfirmation] = useState();
    const [confirmationMsg, setConfirmationMsg] = useState();
    const [selectedCategory, setSelectedCategory] = useState();


    useEffect(() => {
        (paymentStatus === PAYMENT_STATUS.APPROVED && setShowConfirmation(true))
        setConfirmationMsg(CONFIRMATION_TEXT.BUSINESS_LISTINGS);
    }, [paymentStatus]);

    function onSubmitServices() {
        setShowConfirmation(true);
        setConfirmationMsg(CONFIRMATION_TEXT.BUSINESS_LISTINGS);
    }

    function onSubmitMembers() {
        setShowConfirmation(true);
        setConfirmationMsg(CONFIRMATION_TEXT.MEMBER_LISTINGS);
    }

    const onSubmitClassifieds = () => {
        setDisplayPayment(true);
        scroll.scrollToBottom({
                // set smoothness = https://www.npmjs.com/package/react-scroll
                smooth: 'easeInOutQuad',
            }
        );
    };

    const handleSelectedCategory = (category) => {
        setSelectedCategory(category);
        // hide payment section when categories are changed
        setDisplayPayment(false);
    };

    const handlePaymentStatus = (status) => {
        setPaymentStatus(status);
    };

    const formToDisplay = (category) => {
        switch (category) {
            case MEMBER_SERVICE_CATEGORIES.MEMBER_HOME:
                return <MemberHomeShareForm onSubmit={onSubmitMembers}/>
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
    return (
        <div>
            {/* Checking to Ensure User is authenticated to view this page*/}
            {!authenticated ?
                <InvalidUser message={"You must be a registered member or business to view this page."}/> :

                // Display confirmation if payment went through or services positing is submitted
                !showConfirmation ?
                    <div className={"sideBar-container grid-cols-8"}>
                        <div className={"sideBar col-end-3"}>
                            <CreateListingControls
                                isUserMember={accountType === USER_TYPES.MEMBER}
                                categoryToDisplay={handleSelectedCategory}/>
                        </div>

                        <div className={"sideBar-selected-component col-start-3 col-end-10"}>
                            {formToDisplay(selectedCategory)}
                            {displayPayment &&
                            <Paypal
                                paymentStatus={handlePaymentStatus}
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
    authenticated: PropTypes.bool.isRequired,
    accountType: PropTypes.string
}

export default compose(
    withRouter,
    connect(mapStateToProps, null)
)(CreateListingContainer);