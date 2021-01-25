/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.01.25
 *
 * @Description: Component that allows user to upload new image
 *
 */

import FileUploadButton from "./FileUploadButton";
import React from "react";
import PropTypes from 'prop-types';

const UploadImage = (props) => {
    const {handleImageUpload} = props;
    return (
        <div
            className={"flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed " +
            "rounded-md"}
        >
            <div className="space-y-1 text-center">
                <svg
                    className="w-12 h-12 mx-auto text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                >
                    <path
                        d={"M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 " +
                        "01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 " +
                        "015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <FileUploadButton
                    className={"photo-upload-width photo-upload hover:text-indigo-500"}
                    name={'logo'}
                    uploadHandler={handleImageUpload}
                    accept={'image/png, image/jpg, image/jpeg, image/JPG'}
                />
                <p className="text-xs text-gray-500">
                    PNG or JPG up to 2MB
                </p>
            </div>
        </div>
    );
}

UploadImage.propTypes = {
    handleImageUpload: PropTypes.func.isRequired
}

export default UploadImage;
