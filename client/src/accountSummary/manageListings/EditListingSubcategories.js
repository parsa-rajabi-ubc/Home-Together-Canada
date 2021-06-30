/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.06.29
 *
 * @Description: Container component with logic for editing listings' subcategories
 *
 */

import React, {useState} from "react";
import PropTypes from 'prop-types';
import {toast} from "react-toastify";

import CheckboxesList from "../../common/forms/CheckboxesList";
import {getSubcategories} from "../../common/utils/listingsUtils";
import {isValueInArray} from "../../common/utils/generalUtils";
import SubmitButton from "../../common/forms/SubmitButton";
import * as ListingService from '../../services/ListingService';
import {getConcatenatedErrorMessage} from "../../registration/registrationUtils";
import {CREATE_LISTING_CONTROLS_TEXT} from "../../createListing/CreateListingControls";

toast.configure();

const EditListingSubcategories = props => {
    const {categoryName, listingId, savedSubcategories} = props;

    const [selectedSubcategories, setSelectedSubcategories] = useState(savedSubcategories);

    function handleSubcategoriesChange(e) {
        const list = [...selectedSubcategories];
        const value = e.target.id;
        // check if the value select already exists in the list
        if (!isValueInArray(list, value)) {
            // if not, add the value
            list.push(value);
        } else {
            // if it does, remove it from the array
            list.splice(list.indexOf(value), 1);
        }
        setSelectedSubcategories(list);
    }

    function submitSubcategoriesChanges() {
        ListingService.editSubcategories(listingId, selectedSubcategories)
            .then(res => res.json())
            .then(data => {
                console.log('data: ', data);
                if (data.updated) {
                    toast.success('Successfully updated subcategories for listing!')
                } else if (data.errors) {
                    toast.error(getConcatenatedErrorMessage(data.errors));
                } else {
                    toast.error('There was error updating the subcategories for your listing. Please try again and contact Home Together if the issue persists.')
                }
            })
    }

    return (
        <div>
            <div className="page-layout">
                <div className="text-outer-shell">
                    <div className="text-inner-shell">
                        <h3 className="info-header">Edit Subcategories</h3>
                        <p className="info-text">
                            Please select all the appropriate subcategories for your listing. Note: you can not change
                            the category of the listing.
                        </p>
                    </div>
                </div>
                <div className="content-outer-shell space-y-1">
                    <div className="content-grid">
                        <div className="content-grid-span">
                            <div className="content-inner-shell">
                                <p className={"label text-lg my-5"}>{CREATE_LISTING_CONTROLS_TEXT.SELECT_SUBCATEGORIES}</p>
                                <CheckboxesList
                                    values={getSubcategories(categoryName)}
                                    selectedValues={selectedSubcategories}
                                    onChange={handleSubcategoriesChange}
                                />
                                <SubmitButton
                                    className={"btn btn-green form-btn w-1/2"}
                                    onClick={submitSubcategoriesChanges}
                                    inputValue={'Save New Subcategories'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

EditListingSubcategories.propTypes = {
    categoryName: PropTypes.string.isRequired,
    listingId: PropTypes.number.isRequired,
    savedSubcategories: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default EditListingSubcategories;
