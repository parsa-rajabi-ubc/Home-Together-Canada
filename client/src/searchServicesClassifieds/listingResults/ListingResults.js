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
import {listingContext} from "../SearchListingContainer";
import BusinessListingCard from "../listingCards/BusinessListingCard";
import MemberListingCard from "../listingCards/MemberListingCard";
import {USER_TYPES as USER_TYPE} from "../../common/constants/users";
import {getImageURL} from "../../common/utils/imageUtils";

const NUM_RESULTS = 7;

function ListingResults(props) {
    const {listingData, listingUser} = props;

    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const listingPage = useContext(listingContext);

    useEffect(() => {
        if (listingUser === USER_TYPE.MEMBER) {
            setCardData(listingData.map(
                (listing) =>
                    <Link
                        to={{
                            pathname: `/${listingPage}/${listing.id}`,
                            state: {
                                listing: listing
                            }
                        }}
                        key={listing.id}
                    >
                        <MemberListingCard
                            title={listing.title}
                            monthlyCost={listing.monthlyCost}
                            petFriendly={listing.petFriendly}
                            smokeFriendly={listing.smokeFriendly}
                            shortDescription={listing.shortDescription}
                            datePosted={listing.createdAt}/>
                    </Link>
            ));
            setLoading(false);
        } else {
            setCardData(listingData.map(
                (listing) =>
                    <Link
                        to={{
                            pathname: `/${listingPage}/${listing.id}`,
                            state: {
                                listing: listing
                            }
                        }}
                        key={listing.id}
                    >
                        <BusinessListingCard
                            logo={listing.business.logo && getImageURL(listing.business.logo)}
                            title={listing.title}
                            businessName={listing.business.businessName}
                            shortDescription={listing.shortDescription}
                            datePosted={listing.createdAt}/>
                    </Link>
            ));
            setLoading(false);
        }
    }, []);


    return (
        <div>
            {!loading && <Paginate data={cardData} resultsPerPage={NUM_RESULTS}/>}
        </div>
    );
}

ListingResults.propTypes = {
    listingData: PropTypes.array.isRequired,
    listingUser: PropTypes.string.isRequired,
};


export default ListingResults;