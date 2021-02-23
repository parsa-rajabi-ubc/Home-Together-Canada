/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.19
 *
 * @Description: Listing Results Component
 *
 */

import React, {useContext, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Paginate from "../../common/forms/Paginate";
import {listingContext, PAGE_NAMES} from "../SearchListingContainer";
import BusinessListingCard from "../listingCards/BusinessListingCard";
import MemberListingCard from "../listingCards/MemberListingCard";
import {USER_TYPES as USER_TYPE} from "../../common/constants/users";
import HTC_Logo from "../../images/HTC_Logo.jpg"

const NUM_RESULTS = 7;

function ListingResults(props) {
    const {listingData, listingUser} = props;

    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const listingPage = useContext(listingContext);

    const businessCards = mockBusinessListings.map(
        (business) =>
            <Link to={`/${listingPage}/${business.id}`} key={business.id}>
                <BusinessListingCard
                    logo={business.logo}
                    title={business.title}
                    businessName={business.businessName}
                    shortDescription={business.shortDescription}
                    datePosted={business.datePosted}/>
            </Link>
    )

    const memberListingCards = mockMemberListings.map(
        (member) =>
            <Link to={`/${listingPage}/${member.id}`} key={member.id}>
                <MemberListingCard
                    title={member.title}
                    monthlyCost={member.monthlyCost}
                    petFriendly={member.petFriendly}
                    smokeFriendly={member.smokeFriendly}
                    shortDescription={member.shortDescription}
                    datePosted={member.datePosted}/>
            </Link>
    )

    const [listingCards, setListingCards] = useState((listingPage === PAGE_NAMES.SERVICES) ? businessCards.concat(memberListingCards) : businessCards)

    useEffect(() => {
        setListingCards((listingPage === PAGE_NAMES.SERVICES) ? businessCards.concat(memberListingCards) : businessCards)
    }, [listingPage]);


    return (
        <div>
            <Paginate data={listingCards} resultsPerPage={NUM_RESULTS}/>
        </div>
    );
}

ListingResults.propTypes = {
    listingData: PropTypes.array.isRequired,
    listingUser: PropTypes.string.isRequired,
};


export default ListingResults;