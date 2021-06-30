/**
 * @Author      Rachelle Gelden
 * @Created:    2021.06.26
 *
 * @Description: Component used to display image galleries with the ability to delete images
 */

import React from "react";
import PropTypes from 'prop-types';
import {MdDeleteForever} from "react-icons/all";
import {getImageURL} from "../../utils/imageUtils";

const EditImages = props => {
    const { images, onDeleteImage } = props;

    const imagesWithControls = images.map(image => {
        return (
            <div key={image}>
                <img
                    src={getImageURL(image)}
                    alt={'uploaded image'}
                    className={"w-40 h-40 mt-10"}
                />
                <MdDeleteForever
                    color="#DB4437"
                    size="40"
                    className={"mx-auto w-1/2 mt-3 mb-5 "}
                    onClick={() => onDeleteImage(image)}
                />
            </div>
        );
    });

    return (
        <div className={"flex flex-wrap justify-around"}>
            {imagesWithControls}
        </div>
    );
}

EditImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDeleteImage: PropTypes.func.isRequired,
}

export default EditImages;
