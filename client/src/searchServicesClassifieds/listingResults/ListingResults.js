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
import {mockBusinessListings} from "../../mockData/MockListingData";

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

    return (
        <div>
            <Paginate data={businessCards} resultsPerPage={NUM_RESULTS}/>
        </div>
    );
}


export default ListingResults;