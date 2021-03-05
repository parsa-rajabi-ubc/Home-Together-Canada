/**
 *
 * @Author:     Parsa Rajabi
 * @Created:    2021.2.19
 *
 * @Description: Listing Results Container
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import ListingResults from "./ListingResults";
import Confirmation from "../../common/listings/Confirmation";

const MESSAGE = {
    NO_RESULTS: "No results found"
}

function ListingResultsContainer(props) {
    const {listingUser, listingData} = props;


    return (
        <div className={"m-6"}>
            {(!listingData.length) ? <Confirmation displayButton={false} errorColor={true} message={MESSAGE.NO_RESULTS}/>
                : <ListingResults listingUser={listingUser} listingData={listingData}/>}
        </div>
    );
}

ListingResultsContainer.propTypes = {
    listingUser: PropTypes.string.isRequired,
    listingData: PropTypes.array.isRequired,
};

export default ListingResultsContainer;
