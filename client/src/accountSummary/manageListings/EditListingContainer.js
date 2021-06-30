/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.06.29
 *
 * @Description: Container component with logic for editing listings
 *
 */

import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import get from 'lodash/get';
import includes from 'lodash/includes';
import {toast} from "react-toastify";

import MemberHomeShareForm from "../../createListing/forms/services/MemberHomeShareForm";
import {
    BUSINESS_SERVICE_CATEGORIES,
    MEMBER_SERVICE_CATEGORIES
} from "../../createListing/constants/serviceListingCategoriesText";
import CohousingForm from "../../createListing/forms/services/CohousingForm";
import {
    getConcatenatedErrorMessage,
    getPhoneNumberFromStrings,
    resolveYesNoToBoolean
} from "../../registration/registrationUtils";
import * as ListingService from '../../services/ListingService';
import HomeServiceBusinessForm from "../../createListing/forms/services/HomeServiceBusinessForm";
import {BUSINESS_CLASSIFIEDS_CATEGORIES} from "../../createListing/constants/classifiedListingCategoriesText";
import GovernmentServicesForm from "../../createListing/forms/services/GovernmentServicesForm";
import RentalsForm from "../../createListing/forms/classifieds/RentalsForm";
import HouseServicesForm from "../../createListing/forms/classifieds/HouseServicesForm";
import AgenciesForm from "../../createListing/forms/classifieds/AgenciesForm";
import Loading from "../../common/loading/Loading";
import EditImagesContainer from "../../common/forms/EditImages/EditImagesContainer";
import {LISTING_CATEGORIES_WITH_IMAGES} from "../../common/constants/listingsConstants";
import EditListingSubcategories from "./EditListingSubcategories";

toast.configure();

const EditListingContainer = props => {
    const { history } = props;
    const [listing, setListing] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (!get(props, 'location.state.listing')) {
            history.push('/');
        } else {
            setListing(get(props, 'location.state.listing'));
            setImages(get(props, 'location.state.listing.images'))
            setIsLoading(false);
        }
    }, []);

    function editListing(editedListing) {
        if (!isLoading) {
            setIsLoading(true);
            const requestBody = {
                listingId: listing.id,
                ...editedListing,
                ...(listing.categoryName === MEMBER_SERVICE_CATEGORIES.MEMBER_HOME) && {
                    petFriendly: resolveYesNoToBoolean(editedListing.petFriendly),
                    smokeFriendly: resolveYesNoToBoolean(editedListing.smokeFriendly),
                    utilitiesIncluded: resolveYesNoToBoolean(editedListing.utilIncluded),
                },
                ...(listing.categoryName === BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES
                    || listing.categoryName === BUSINESS_CLASSIFIEDS_CATEGORIES.CLASSES_CLUBS) && {
                    contactPhoneNumber: getPhoneNumberFromStrings(editedListing.contactPhoneNumber.first, editedListing.contactPhoneNumber.middle, editedListing.contactPhoneNumber.last),
                },
            }

            ListingService.editListing(requestBody)
                .then(res => res.json())
                .then(data => {
                    if (data.updated) {

                        // update input fields with saved values
                        const updatedListing = {
                            ...listing,
                            ...requestBody
                        };
                        setListing(updatedListing);
                        toast.success('Listing successfully updated!');
                    } else if (data && data.errors && data.errors.length) {
                        const errorMessage = getConcatenatedErrorMessage(data.errors);
                        toast.error(errorMessage);
                    } else if (data.err) {
                        toast.error(data.err);
                    } else {
                        toast.error('There was an error creating your listing. Please contact Home Together ' +
                            'if the issue persists.');
                    }
                    setIsLoading(false);
                })
        }
    }

    function returnCustomFieldComponent(category) {
        switch (category) {
            case MEMBER_SERVICE_CATEGORIES.MEMBER_HOME:
                return (
                    <MemberHomeShareForm
                        onSubmit={editListing}
                        listingExists={!!listing}
                        existingTitle={listing.title}
                        existingShortDescription={listing.shortDescription}
                        existingFullDescription={listing.fullDescription}
                        existingMonthlyCost={listing.monthlyCost}
                        existingUtilsIncluded={listing.utilIncluded}
                        existingNumBed={listing.numBed}
                        existingNumBath={listing.numBath}
                        existingPetFriendly={listing.petFriendly}
                        existingSmokeFriendly={listing.smokeFriendly}
                        existingAddressLine1={listing.addressLine1}
                        existingCity={listing.city}
                        existingProvince={listing.province}
                        existingPostalCode={listing.postalCode}
                    />
                );
            case BUSINESS_SERVICE_CATEGORIES.CO_HOUSING:
                return (
                    <CohousingForm
                        onSubmit={editListing}
                        listingExists={!!listing}
                        existingTitle={listing.title}
                        existingShortDescription={listing.shortDescription}
                        existingFullDescription={listing.fullDescription}
                        existingContactName={listing.contactName}
                        existingUnitsForSale={listing.unitsForSale}
                        existingUnitsForRent={listing.unitsForRent}
                    />
                );
            case BUSINESS_SERVICE_CATEGORIES.SHARED_HOME_SERVICES || BUSINESS_SERVICE_CATEGORIES.SHARED_BUSINESS_SERVICES:
                return (
                    <HomeServiceBusinessForm
                        onSubmit={editListing}
                        category={listing.category}
                        listingExists={!!listing}
                        existingTitle={listing.title}
                        existingShortDescription={listing.shortDescription}
                        existingFullDescription={listing.fullDescription}
                        existingRateAndFees={listing.rateAndFees}
                    />
                );
            case BUSINESS_SERVICE_CATEGORIES.GOVERNMENT_SERVICES: {
                return (
                    <GovernmentServicesForm
                        onSubmit={editListing}
                        listingExists={!!listing}
                        existingTitle={listing.title}
                        existingShortDescription={listing.shortDescription}
                        existingFullDescription={listing.fullDescription}
                        existingContactName={listing.contactName}
                        existingContactPhoneNumber={listing.contactPhoneNumber}
                    />
                );
            }
            case BUSINESS_CLASSIFIEDS_CATEGORIES.RENTALS: {
                return (
                    <RentalsForm
                        onSubmit={editListing}
                        listingExists={!!listing}
                        existingTitle={listing.title}
                        existingShortDescription={listing.shortDescription}
                        existingFullDescription={listing.fullDescription}
                        existingMonthlyCost={listing.monthlyCost}
                        existingNumBed={listing.numBed}
                        existingNumBath={listing.numBath}
                        existingPetFriendly={listing.petFriendly}
                        existingSmokeFriendly={listing.smokeFriendly}
                        existingFurnished={listing.furnished}
                    />
                );
            }
            case BUSINESS_CLASSIFIEDS_CATEGORIES.HOUSE_YARD: {
                return (
                    <HouseServicesForm
                        onSubmit={editListing}
                        listingExists={!!listing}
                        existingTitle={listing.title}
                        existingShortDescription={listing.shortDescription}
                        existingFullDescription={listing.fullDescription}
                        existingRateAndFees={listing.rateAndFees}
                    />
                );
            }
            case BUSINESS_CLASSIFIEDS_CATEGORIES.LEGAL_SALES: {
                return (
                    <AgenciesForm
                        onSubmit={editListing}
                        listingExists={!!listing}
                        existingTitle={listing.title}
                        existingShortDescription={listing.shortDescription}
                        existingFullDescription={listing.fullDescription}
                        existingRateAndFees={listing.rateAndFees}
                    />
                );
            }
        }
    }

    return (
        <div>
            {isLoading
                ? <div><Loading isLoading={isLoading}/></div>
                : <div>
                    {returnCustomFieldComponent(listing.categoryName)}
                    {includes(LISTING_CATEGORIES_WITH_IMAGES, listing.categoryName) &&
                        <EditImagesContainer listingImages={images} listingId={listing.id}/>
                    }
                    {(includes(Object.values(BUSINESS_SERVICE_CATEGORIES), listing.categoryName) || includes(Object.values(BUSINESS_CLASSIFIEDS_CATEGORIES), listing.categoryName)) &&
                        <EditListingSubcategories
                            categoryName={listing.categoryName}
                            listingId={listing.id}
                            savedSubcategories={listing.subcategories}
                        />
                    }
                </div>
            }
        </div>
    )
}

EditListingContainer.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
        state: PropTypes.object
    }),
    history: PropTypes.shape({
        push: PropTypes.func
    })
}

export default EditListingContainer;
