/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.1.24
 *
 * @Description: Create Listing Container;
 *
 */

import React, {useState} from 'react';
import CreateListingControls from "./CreateListingControls";
import MemberHomeShareForm from "./forms/services/MemberHomeShareForm";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {compose} from "redux";
import {connect} from "react-redux";
import {USER_TYPES} from "../common/constants/users";
import InvalidUser from "../common/error/InvalidUser";
import {BUSINESS_SERVICE_CATEGORIES} from "./constants/serviceListingText";
import {BUSINESS_CLASSIFIEDS_CATEGORIES} from "./constants/classifiedListingText";
import {MEMBER_SERVICE_CATEGORIES} from "./constants/serviceListingText";
import CohousingForm from "./forms/services/CohousingForm";
import HomeServiceBusinessForm from "./forms/services/HomeServiceBusinessForm";
import GovernmentServicesForm from "./forms/services/GovernmentServicesForm";

function onSubmit() {

}

const CreateListingContainer = (props) => {
    const {accountType, authenticated} = props;

    const [selectedCategory, setSelectedCategory] = useState();

    const handleSelectedCategory = (category) => {
        setSelectedCategory(category);
    }

    const formToDisplay = (category) => {
        switch (category) {
            case MEMBER_SERVICE_CATEGORIES.MEMBER_HOME:
                return <MemberHomeShareForm onSubmit={onSubmit}/>
            case BUSINESS_SERVICE_CATEGORIES.CO_HOUSING:
                return <CohousingForm onSubmit={onSubmit}/>
            case BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES:
                return <HomeServiceBusinessForm onSubmit={onSubmit}/>;
            case BUSINESS_SERVICE_CATEGORIES.SHARED_BUSINESS_SERVICES:
                return <HomeServiceBusinessForm onSubmit={onSubmit}/>;
            case BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES:
                return <GovernmentServicesForm onSubmit={onSubmit}/>;
            case BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS:
                return "TODO: Replace this with RentalForm";
            case BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD:
                return "TODO: Replace this with HouseYardForm";
            case BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES:
                return "TODO: Replace this with LegalForm";
            case BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS:
                return "TODO: Replace this with ClassesClubs";
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
            {!authenticated ? <InvalidUser message={"You must be a registered member or business to view this page."}/> :
                // Display Container if the user is logged in as member or business
                <div className={"sideBar-container grid-cols-8"}>
                    <div className={"sideBar col-end-3"}>
                        <CreateListingControls isUserMember={accountType === USER_TYPES.MEMBER} categoryToDisplay={handleSelectedCategory}/>
                    </div>
                    <div className={"sideBar-selected-component col-start-3 col-end-10"}>
                        {formToDisplay(selectedCategory)}
                    </div>
                </div>}
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