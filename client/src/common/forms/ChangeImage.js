/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.01.25
 *
 * @Description: Component that displays image and allows user to upload new image
 *
 */

import FileUploadButton from "./FileUploadButton";
import React, {useState} from "react";
import PropTypes from 'prop-types';

const ChangeImage = (props) => {
    const {imageAddress, handleImageUpload} = props;

    const [newImageSelected, setNewImageSelected] = useState(false);

    function onImageUpload (e) {
        handleImageUpload(e);
        setNewImageSelected(true);
    }

    return (
        <div
            className={"justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"}
        >
            {!newImageSelected && <img src={imageAddress}/>}
            <br/>
            <div>
                <label><b>Upload a new logo: </b></label>
                <FileUploadButton
                    className={"photo-upload-width photo-upload hover:text-indigo-500"}
                    name={'fileUpload'}
                    uploadHandler={onImageUpload}
                    accept={'image/png, image/jpg, image/jpeg, image/JPG'}
                />
            </div>

        </div>
    );
}

ChangeImage.propTypes = {
    // TODO: separate the image address from the new file that is passed in if an image is uploaded
    imageAddress: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    handleImageUpload: PropTypes.func.isRequired
}

export default ChangeImage;
