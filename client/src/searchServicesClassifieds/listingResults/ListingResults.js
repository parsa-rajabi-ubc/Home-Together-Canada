/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.19
 *
 * @Description: Listing Results Component
 *
 */

import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import Paginate from "../../common/forms/Paginate";
import {listingContext} from "../SearchListingContainer";
import BusinessListingCard from "../listingCards/BusinessListingCard";
import {mockBusinessListings, mockMemberListings} from "../../mockData/MockListingData";
import MemberListingCard from "../listingCards/MemberListingCard";

const NUM_RESULTS = 7;

function ListingResults() {

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
                    smokeFriendly={member.smokeFriendly
                    }
                    shortDescription={member.shortDescription}
                    datePosted={member.datePosted}/>
            </Link>
    )

    return (
        <div>
            <Paginate data={businessCards} resultsPerPage={NUM_RESULTS}/>
            <Paginate data={memberListingCards} resultsPerPage={NUM_RESULTS}/>
        </div>
    );
}


export default ListingResults;