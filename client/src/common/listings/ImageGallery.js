import React from 'react';
import PropTypes from "prop-types";
import Lightbox from 'react-lightbox-component';
import "react-lightbox-component/build/css/index.css";
import {getImageURL} from "../utils/imageUtils";

export const ImageGallery = props => {
    const { pictures } = props;

    const imagesInfo = pictures.map(picture => {
        return ({ src: getImageURL(picture) });
    });

    console.log('imagesInfo: ', imagesInfo);

    return (
        <div>
            <Lightbox images={imagesInfo}/>
        </div>
    );
}

ImageGallery.propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.string).isRequired
}
