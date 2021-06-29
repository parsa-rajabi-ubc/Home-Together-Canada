import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {toast} from "react-toastify";

import EditImages from "./EditImages";
import {DEFAULT_MAX_NUM_IMAGES} from "../../../createListing/constants/createListingConfig";
import MultiImageUpload from "../MultiImageUpload";
import * as UploadService from '../../../services/UploadService';
import * as ListingService from '../../../services/ListingService';
import SubmitButton from "../SubmitButton";
import {getConcatenatedErrorMessage} from "../../../registration/registrationUtils";

toast.configure();

const EditImagesContainer = props => {
    const { listingImages, listingId } = props;

    const [editableImages, setEditableImages] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [numImagesCanUploaded, setNumImagesCanBeUploaded] = useState(0);

    // used to reset text in file upload
    const [imageUploadKey, setImageUploadKey] = useState(Date.now());

    useEffect(() => {
        setEditableImages([...listingImages]);
        setNumImagesCanBeUploaded(DEFAULT_MAX_NUM_IMAGES - editableImages.length);
    }, [props]);

    useEffect(() => {
        setNumImagesCanBeUploaded(DEFAULT_MAX_NUM_IMAGES - editableImages.length);
    }, [editableImages])

    function handleUploadImage(e) {
        setUploadedImages([...e.target.files]);
    }

    function handleDeleteImage(image) {
        ListingService.deleteListingImages(listingId, [image])
            .then(res => res.json())
            .then(data => {
                if (data && data.images && data.success) {
                    toast.success('Image successfully deleted');
                    const updatedImages = [...data.images];
                    setEditableImages(updatedImages);
                } else if (data && data.errors) {
                    toast.error(getConcatenatedErrorMessage(data.errors));
                } else {
                    toast.error('There was an error that occurred while deleting listing image. Please try again and contact Home Together Canada if the issue persists.');
                }
            })
            .catch(() => {
                toast.error('There was an error that occurred while deleting listing image. Please try again and contact Home Together Canada if the issue persists.');
            });
    }

    function handleSubmit() {
        UploadService.editListingImages(listingId, uploadedImages)
            .then(res => res.json())
            .then(data => {
                if (data && data.images && data.success) {
                    setUploadedImages([]);
                    setEditableImages([...data.images]);
                    setImageUploadKey(Date.now());
                    toast.success('Successfully saved images to listing!');
                } else if (data && data.errors) {
                    toast.error(getConcatenatedErrorMessage(data.errors));
                } else {
                    toast.error('There was error uploading your image(s). Please try again and contact Home Together Canada if the issue persists.')
                }
            })
            .catch(() => {
                toast.error('There was error uploading your image(s). Please try again and contact Home Together Canada if the issue persists.')
            });
    }

    return (
        <div>
            <EditImages images={editableImages} onDeleteImage={handleDeleteImage}/>
            {numImagesCanUploaded === 1 &&
                <p>{`A listing can have ${DEFAULT_MAX_NUM_IMAGES} images, you can upload ${(DEFAULT_MAX_NUM_IMAGES - editableImages.length)} more image`}</p>
            }
            {numImagesCanUploaded > 1 &&
                <p>{`A listing can have ${DEFAULT_MAX_NUM_IMAGES} images, you can upload ${(DEFAULT_MAX_NUM_IMAGES - editableImages.length)} more images`}</p>
            }
            {numImagesCanUploaded !== 0 &&
                <MultiImageUpload
                    handleImageUpload={handleUploadImage}
                    maxNumImages={(DEFAULT_MAX_NUM_IMAGES - editableImages.length)}
                    imageUploadKey={imageUploadKey}
                />
            }
            {!!numImagesCanUploaded &&
                <SubmitButton
                    className={"btn btn-green form-btn w-1/2"}
                    onClick={handleSubmit}
                    disabled={!uploadedImages.length}
                    inputValue={'Save New Images'}
                />
            }
        </div>
    );
}

EditImagesContainer.propTypes = {
    listingImages: PropTypes.arrayOf(PropTypes.string).isRequired,
    listingId: PropTypes.number
}

export default EditImagesContainer;
