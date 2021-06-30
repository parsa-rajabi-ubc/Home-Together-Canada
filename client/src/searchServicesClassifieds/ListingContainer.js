/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.20
 *
 * @Description: Business Listing Container
 *
 */

import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import BusinessInfo from "./listings/BusinessInfo";
import HTC_Logo from "../images/HTC_Logo.jpg";
import Loading from "../common/loading/Loading";
import {
    BUSINESS_SERVICE_CATEGORIES,
    MEMBER_SERVICE_CATEGORIES
} from "../createListing/constants/serviceListingCategoriesText";
import {BUSINESS_CLASSIFIEDS_CATEGORIES} from "../createListing/constants/classifiedListingCategoriesText";
import CohousingCustomFields from "./listings/customFields/services/CohousingCustomFields";
import HomeServiceBusinessCustomFields from "./listings/customFields/services/HomeServiceBusinessCustomFields";
import GovernmentServicesCustomFields from "./listings/customFields/services/GovernmentServicesCustomFields";
import MemberHomeToShareCustomFields from "./listings/customFields/services/MemberHomeToShareCustomFields";
import RentalsCustomFields from "./listings/customFields/classifieds/RentalsCustomFields";
import AgenciesCustomFields from "./listings/customFields/classifieds/AgenciesCustomFields";
import EventsCustomFields from "./listings/customFields/classifieds/EventsCustomFields";
import HouseServicesCustomFields from "./listings/customFields/classifieds/HouseServicesCustomFields";
import Confirmation from "../common/listings/Confirmation";
import {useHistory} from "react-router-dom";
import {PAGE_NAMES} from "./SearchListingContainer";
import {getImageURL} from "../common/utils/imageUtils";

const MESSAGE = {
    INVALID_PAGE: "Please click on listing cards on search page to view listings",
    INVALID_PAGE_BUTTON_TEXT: "Back to Search Page"
}

function ListingContainer(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const listingPage = useHistory().location.pathname;
    const [redirectTo, setRedirectTo] = useState('/');

    // Common Fields
    const [title, setTitle] = useState();
    const [fullDescription, setFullDescription] = useState();
    const [listingCategory, setListingCategory] = useState();

    // Custom Fields
    const [contactName, setContactName] = useState();
    const [contactPhoneNumber, setContactPhoneNumber] = useState();
    const [unitForSale, setUnitForSale] = useState();
    const [unitForRent, setUnitForRent] = useState();
    const [pictures, setPictures] = useState([]);
    const [rateAndFees, setRateAndFees] = useState();
    const [price, setPrice] = useState();
    const [numBed, setNumBed] = useState();
    const [numBath, setNumBath] = useState();
    const [furnished, setFurnished] = useState();
    const [petFriendly, setPetFriendly] = useState();
    const [smokeFriendly, setSmokeFriendly] = useState();
    const [eventDateTime, setEventDateTime] = useState();
    const [memberAddressLine1, setMemberAddressLine1] = useState();
    const [memberAddressLine2, setMemberAddressLine2] = useState();
    const [memberAddressCity, setMemberAddressCity] = useState();
    const [memberAddressProvince, setMemberAddressProvince] = useState();
    const [memberAddressPostalCode, setMemberAddressPostalCode] = useState();
    const [homeShareMonthlyCost, setHomeShareMonthlyCost] = useState();
    const [utilIncluded, setUtilIncluded] = useState();

    // Business Info
    const [logo, setLogo] = useState();
    const [businessName, setBusinessName] = useState();
    const [address, setAddress] = useState({
        streetLine1: "",
        streetLine2: "",
        city: "",
        province: "",
        postalCode: "",
    });
    const [isNationWide, setIsNationWide] = useState();
    const [website, setWebsite] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();

    // Get Data
    useEffect(() => {
        setLoading(true);

        // set listing if props.location.state exists
        if (props.location.state) {
            const {listing} = props.location.state;
            setCommonListingData(listing);
            setCustomFieldData(listing);

            // only set business info if the category name is not member
            if (listing.categoryName !== MEMBER_SERVICE_CATEGORIES.MEMBER_HOME) {
                setBusinessInfo(listing)
            }
            // display error if user tries to access page through URL
            // redirect user to right searching page based on their URL
        } else {
            setError(true);
            if (listingPage.includes(PAGE_NAMES.SERVICES)) {
                setRedirectTo("/" + PAGE_NAMES.SERVICES)
            } else if (listingPage.includes(PAGE_NAMES.CLASSIFIEDS)) {
                setRedirectTo("/" + PAGE_NAMES.CLASSIFIEDS)
            } else
                setRedirectTo("/");
        }
    }, []);


    const setBusinessInfo = (listing) => {
        setLogo(listing.business.logo ? getImageURL(listing.business.logo) : HTC_Logo);
        setBusinessName(listing.business.businessName);
        if (listing.business.mapAddressLine1) {
            setAddress({
                streetLine1: listing.business.mapAddressLine1,
                streetLine2: listing.business.mapAddressLine2,
                city: listing.business.mapCity,
                province: listing.business.mapProvince,
                postalCode: listing.business.mapPostalCode,
            });
        } else {
            setIsNationWide(listing.business.isNationWide);
        }
        setWebsite(listing.business.website);
        setPhone(listing.business.businessPhoneNumber);
        setEmail(listing.business.email);
    }

    const setCommonListingData = (listing) => {
        setListingCategory(listing.categoryName);
        setTitle(listing.title);
        setFullDescription(listing.fullDescription);
    }

    const setCustomFieldData = (listing) => {
        switch (listing.categoryName) {
            case MEMBER_SERVICE_CATEGORIES.MEMBER_HOME:
                setMemberAddressLine1(listing.addressLine1);
                setMemberAddressLine2(listing.addressLine2);
                setMemberAddressCity(listing.city);
                setMemberAddressProvince(listing.province);
                setMemberAddressPostalCode(listing.postalCode);
                setHomeShareMonthlyCost(listing.monthlyCost);
                setNumBed(listing.numBed);
                setNumBath(listing.numBath);
                setFurnished(listing.furnished);
                setPetFriendly(listing.petFriendly);
                setSmokeFriendly(listing.smokeFriendly);
                setUtilIncluded(listing.utilIncluded);
                setPictures(listing.images);
                break;
            case BUSINESS_SERVICE_CATEGORIES.CO_HOUSING:
                setContactName(listing.contactName);
                setUnitForSale(listing.unitsForSale);
                setUnitForRent(listing.unitsForRent);
                break;
            case BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES:
                setRateAndFees(listing.rateAndFees);
                setPictures(listing.images);
                break;
            case BUSINESS_SERVICE_CATEGORIES.SHARED_BUSINESS_SERVICES:
                setRateAndFees(listing.rateAndFees);
                setPictures(listing.images);
                break;
            case BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES:
                setContactName(listing.contactName);
                setContactPhoneNumber(listing.contactPhoneNumber.toString());
                break;
            case BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS:
                setPrice(listing.monthlyCost)
                setRateAndFees(listing.rateAndFees);
                setNumBed(listing.numBed);
                setNumBath(listing.numBath);
                setFurnished(listing.furnished);
                setPetFriendly(listing.petFriendly);
                setSmokeFriendly(listing.smokeFriendly);
                setPictures(listing.images);
                break;
            case BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD:
                setRateAndFees(listing.rateAndFees);
                setPictures(listing.images);
                break;
            case BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES:
                setRateAndFees(listing.rateAndFees);
                setPictures(listing.images);
                break;
            case BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS:
                setContactName(listing.contactName);
                setContactPhoneNumber(listing.contactPhoneNumber.toString());
                setRateAndFees(listing.rateAndFees);
                setEventDateTime(listing.eventDateTime);
                setPictures(listing.images);
                break;
        }
        setLoading(false);
    }

    function returnCustomFieldComponent(selectedCategory) {
        switch (selectedCategory) {
            case MEMBER_SERVICE_CATEGORIES.MEMBER_HOME:
                return (
                    <MemberHomeToShareCustomFields
                        homeShareMonthlyCost={homeShareMonthlyCost}
                        numBed={numBed}
                        numBath={numBath}
                        utilIncluded={utilIncluded}
                        petFriendly={petFriendly}
                        smokeFriendly={smokeFriendly}
                        pictures={pictures}

                        streetLine1={memberAddressLine1}
                        streetLine2={memberAddressLine2}
                        city={memberAddressCity}
                        province={memberAddressProvince}
                        postalCode={memberAddressPostalCode}
                    />
                );
            case BUSINESS_SERVICE_CATEGORIES.CO_HOUSING:
                return (
                    <CohousingCustomFields
                        contactName={contactName}
                        unitsForSale={unitForSale}
                        unitsForRent={unitForRent}
                    />
                );
            case BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES:
                return <HomeServiceBusinessCustomFields rateAndFees={rateAndFees} pictures={pictures}/>
            case BUSINESS_SERVICE_CATEGORIES.SHARED_BUSINESS_SERVICES:
                return <HomeServiceBusinessCustomFields rateAndFees={rateAndFees} pictures={pictures}/>
            case BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES:
                return <GovernmentServicesCustomFields contactPerson={contactName} phoneNumber={contactPhoneNumber}/>
            case BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS:
                return (
                    <RentalsCustomFields
                        petFriendly={petFriendly}
                        numBed={numBed}
                        numBath={numBath}
                        furnished={furnished}
                        price={price}
                        smokingFriendly={smokeFriendly}
                        pictures={pictures}
                    />)
            case BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD:
                return <HouseServicesCustomFields rateAndFees={rateAndFees} pictures={pictures}/>
            case BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES:
                return <AgenciesCustomFields rateAndFees={rateAndFees} pictures={pictures}/>
            case BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS:
                return (
                    <EventsCustomFields
                        rateAndFees={rateAndFees}
                        contactName={contactName}
                        contactNumber={contactPhoneNumber}
                        eventDateTime={eventDateTime}
                        pictures={pictures}
                    />
               );
        }
    }


    return (
        <div>
            {error ?
                <Confirmation message={MESSAGE.INVALID_PAGE} redirectTo={redirectTo}
                              buttonText={MESSAGE.INVALID_PAGE_BUTTON_TEXT}/>
                : loading ?
                    <Loading isLoading={loading}/>
                    :
                    <div className="selected-component-grid-outer">
                        <div className="selected-component-grid-inner">
                            <div className={"flex mx-auto my-10 w-full"}>

                                <section className={"flex-col w-full pr-10"}>
                                    <section className={"flex-none w-full"}>
                                        <h1 className={"page-title inline"}> {title} </h1>
                                        {listingCategory === MEMBER_SERVICE_CATEGORIES.MEMBER_HOME &&
                                        <button
                                            className={"btn btn-green inline float-right mb-6 w-1/4 px-0 text-base py-2"}>Send
                                            Message
                                        </button>
                                        }
                                        <p className={"label-result"}> Description </p>
                                        <p className={"my-2"}> {fullDescription} </p>
                                    </section>

                                    <section className={""}>
                                        {returnCustomFieldComponent(listingCategory)}
                                    </section>
                                </section>

                                {/* Conditionally show Business Info -- hidden  if category is MemberHomeToShare */}
                                {listingCategory !== MEMBER_SERVICE_CATEGORIES.MEMBER_HOME &&
                                <section className={"w-1/3"}>
                                    <BusinessInfo
                                        logo={logo}
                                        businessName={businessName}
                                        address={address}
                                        isNationWide={isNationWide}
                                        website={website}
                                        phone={phone}
                                        email={email}
                                    />
                                </section>
                                }

                            </div>
                        </div>
                    </div>
            }
        </div>

    );
}

ListingContainer.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
        state: PropTypes.object
    })
};

export default ListingContainer;
