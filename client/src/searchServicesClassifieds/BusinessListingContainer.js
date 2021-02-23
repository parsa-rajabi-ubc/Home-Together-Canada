/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.20
 *
 * @Description: Business Listing Container
 *
 */

import React, {useContext, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {listingContext} from "./SearchListingContainer";
import {useParams} from "react-router-dom";
import BusinessInfo from "./listings/BusinessInfo";
import BusinessService from "../services/BusinessService";
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
import {mockServiceListings} from "../mockData/MockListing";
import MemberHomeToShareCustomFields from "./listings/customFields/services/MemberHomeToShareCustomFields";
import RentalsCustomFields from "./listings/customFields/classifieds/RentalsCustomFields";
import AgenciesCustomFields from "./listings/customFields/classifieds/AgenciesCustomFields";
import EventsCustomFields from "./listings/customFields/classifieds/EventsCustomFields";
import HouseServicesCustomFields from "./listings/customFields/classifieds/HouseServicesCustomFields";

function BusinessListingContainer(props) {
    const listingPage = useContext(listingContext);
    const {id} = useParams();

    // Common Fields
    const [title, setTitle] = useState();
    const [fullDescription, setFullDescription] = useState();
    const [listingCategory, setListingCategory] = useState();

    // Custom Fields
    const [contactName, setContactName] = useState();
    const [contactPhoneNumber, setContactPhoneNumber] = useState();
    const [unitForSale, setUnitForSale] = useState();
    const [unitForRent, setUnitForRent] = useState();
    const [pictures, setPictures] = useState();
    const [ratesAndFees, setRatesAndFees] = useState();
    const [price, setPrice] = useState();
    const [numBed, setNumBed] = useState();
    const [numBath, setNumBath] = useState();
    const [furnished, setFurnished] = useState();
    const [petFriendly, setPetFriendly] = useState();
    const [smokeFriendly, setSmokeFriendly] = useState();
    const [eventDateTime, setEventDateTime] = useState();
    const [generalLocation, setGeneralLocation] = useState();
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
    const [website, setWebsite] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [loading, setLoading] = useState(true);


    // Get Data
    useEffect(() => {
        //TODO: replace getBusinessAccountInfo with function to retrieve business info based on listing ID
        BusinessService.getBusinessAccountInfo()
            .then(res => res.json())
            .then(data => {
                setBusinessInfo(data.business);
                // TODO: replace mockListing with a listing object from DB
                setCommonListingData(mockServiceListings[3]);
                setLoading(false);

            })
            .catch(err => {
                console.log('err: ', err.message);
            })
    }, []);


    const setBusinessInfo = (business) => {
        //TODO: replace logo with string of logo address in DB
        setLogo(HTC_Logo);
        setBusinessName(business.businessName);
        setAddress({
            streetLine1: business.mapAddressLine1,
            streetLine2: business.mapAddressLine2,
            city: business.mapCity,
            province: business.mapProvince,
            postalCode: business.mapPostalCode,
        });
        // check to see if the website includes http or not and add it if its missing
        (!business.website.includes("http") ? setWebsite("https://" + business.website) : setWebsite(business.website));
        setPhone(business.phoneNumber);
        setEmail(business.email);
    }

    const setCommonListingData = (listing) => {
        setListingCategory(listing.category);
        setTitle(listing.title);
        setFullDescription(listing.fullDescription);
        setCustomFieldData(listing);
    }

    const setCustomFieldData = (listing) => {
        switch (listing.category) {
            case MEMBER_SERVICE_CATEGORIES.MEMBER_HOME:
                setGeneralLocation(listing.generalLocation);
                setHomeShareMonthlyCost(listing.monthlyCost);
                setNumBed(listing.numBed.toString());
                setNumBath(listing.numBath.toString());
                setFurnished(listing.furnished);
                setPetFriendly(listing.petFriendly);
                setSmokeFriendly(listing.smokeFriendly);
                setUtilIncluded(listing.utilIncluded);
                setPictures(listing.pictures);
                break;
            case BUSINESS_SERVICE_CATEGORIES.CO_HOUSING:
                setContactName(listing.contactName);
                setUnitForSale(listing.unitsForSale);
                setUnitForRent(listing.unitsForRent);
                break;
            case BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES:
                setPictures(listing.pictures);
                setRatesAndFees(listing.ratesAndFees);
                break;
            case BUSINESS_SERVICE_CATEGORIES.SHARED_BUSINESS_SERVICES:
                setPictures(listing.pictures);
                setRatesAndFees(listing.ratesAndFees);
                break;
            case BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES:
                setContactName(listing.contactName);
                setContactPhoneNumber(listing.contactPhoneNumber);
                break;
            case BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS:
                setPrice(listing.price)
                setPictures(listing.pictures);
                setRatesAndFees(listing.ratesAndFees);
                setNumBed(listing.numBed);
                setNumBath(listing.numBath);
                setFurnished(listing.furnished);
                setPetFriendly(listing.petFriendly);
                setSmokeFriendly(listing.smokeFriendly);
                break;
            case BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD:
                setPictures(listing.pictures);
                setRatesAndFees(listing.ratesAndFees);
                break;
            case BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES:
                setPictures(listing.pictures);
                setRatesAndFees(listing.ratesAndFees);
                break;
            case BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS:
                setContactName(listing.contactName);
                setContactPhoneNumber(listing.contactPhoneNumber);
                setPictures(listing.pictures);
                setRatesAndFees(listing.ratesAndFees);
                setEventDateTime(listing.eventDateTime)
                break;
        }

    }

    function returnCustomFieldComponent(selectedCategory) {
        switch (selectedCategory) {
            case MEMBER_SERVICE_CATEGORIES.MEMBER_HOME:
                return <MemberHomeToShareCustomFields
                    generalLocationText={generalLocation}
                    homeShareMonthlyCost={homeShareMonthlyCost}
                    numBed={numBed}
                    numBath={numBath}
                    utilIncluded={utilIncluded}
                    petFriendly={petFriendly}
                    smokeFriendly={smokeFriendly}
                    pictures={pictures}
                />
            case BUSINESS_SERVICE_CATEGORIES.CO_HOUSING:
                return <CohousingCustomFields contactName={contactName} unitsForSale={unitForSale}
                                              unitsForRent={unitForRent}/>
            case BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES:
                return <HomeServiceBusinessCustomFields rateAndFees={ratesAndFees} pictures={pictures}/>
            case BUSINESS_SERVICE_CATEGORIES.SHARED_BUSINESS_SERVICES:
                return <HomeServiceBusinessCustomFields rateAndFees={ratesAndFees} pictures={pictures}/>
            case BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES:
                return <GovernmentServicesCustomFields contactPerson={contactName} phoneNumber={contactPhoneNumber}/>
            case BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS:
                return <RentalsCustomFields pictures={pictures} petFriendly={petFriendly} numBed={numBed} numBath={numBath} furnished={furnished} price={price} smokingFriendly={smokeFriendly}/>
            case BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD:
                return <HouseServicesCustomFields rateAndFees={ratesAndFees} pictures={pictures}/>
            case BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES:
                return <AgenciesCustomFields rateAndFees={ratesAndFees} pictures={pictures}/>
            case BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS:
                return <EventsCustomFields rateAndFees={ratesAndFees} contactName={contactName} contactNumber={contactPhoneNumber} eventDateTime={eventDateTime} pictures={pictures}/>
        }
    }


    return (
        <div>
            {loading ?
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

BusinessListingContainer.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
        state: PropTypes.object
    })
};

export default BusinessListingContainer;
