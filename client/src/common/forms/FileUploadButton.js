/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.12
 *
 * @Description: Button used to upload files
 *
 */

import React from 'react';
import PropTypes from "prop-types";

const FileUploadButton = (props) => {
    const {className, name, uploadHandler, accept, multipleFiles=false, imageUploadKey = 0} = props;

    return (
      <input
        type={'file'}
        name={name}
        className={className}
        onChange={uploadHandler}
        accept={accept}
        multiple={multipleFiles}
        key={imageUploadKey}
      />
    );
}

FileUploadButton.propTypes = {
    name: PropTypes.string.isRequired,
    uploadHandler: PropTypes.func.isRequired,
    className: PropTypes.string,
    accept: PropTypes.string,
    multipleFiles: PropTypes.bool,
    imageUploadKey: PropTypes.number
}

export default FileUploadButton;