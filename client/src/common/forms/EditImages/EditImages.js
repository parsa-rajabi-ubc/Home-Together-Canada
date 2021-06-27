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
                <img src={getImageURL(image)} height={'150'} width={'150'}/>
                <MdDeleteForever
                    color="#DB4437"
                    size="40"
                    onClick={() => onDeleteImage(image)}
                />
            </div>
        );
    });

    return (
        <div>
            {imagesWithControls}
        </div>
    );
}

EditImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    onDeleteImage: PropTypes.func.isRequired,
}

export default EditImages;
