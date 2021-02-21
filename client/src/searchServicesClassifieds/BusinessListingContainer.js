/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.20
 *
 * @Description: Business Listing Container
 *
 */

import React, {useContext, useEffect, useState} from 'react';
import {listingContext} from "./SearchListingContainer";
import {useParams} from "react-router-dom";
import BusinessInfo from "./listings/BusinessInfo";
import BusinessService from "../services/BusinessService";
import HTC_Logo from "../images/HTC_Logo.jpg";
import Loading from "../common/loading/Loading";


function BusinessListingContainer() {
    const listingPage = useContext(listingContext);
    const {id} = useParams();

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

    useEffect(() => {
        //TODO: replace getBusinessAccountInfo with function to retrieve business info based on listing ID
        BusinessService.getBusinessAccountInfo()
            .then(res => res.json())
            .then(data => {
                setBusinessInfo(data.business);
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

    return (
        <div>
            {loading ?
                <Loading isLoading={loading}/>
                :
                // Right Side
                <div>
                    <BusinessInfo
                        logo={logo}
                        businessName={businessName}
                        address={address}
                        website={website}
                        phone={phone}
                        email={email}
                    />
                </div>
            }
        </div>

    );
}

export default BusinessListingContainer;
