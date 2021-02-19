/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.19
 *
 * @Description: Listing Results Container
 *
 */

import React, {useContext} from 'react';
import {listingContext} from "../SearchListingContainer";
import ListingResults from "./ListingResults";

function ListingResultsContainer() {

    const listingPage = useContext(listingContext);

    return (
        <div className={"m-6"}>
            <ListingResults/>
        </div>
    );
}


export default ListingResultsContainer;
