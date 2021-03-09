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
    const {className, name, uploadHandler, accept, multipleFiles=false} = props;

    return (
      <input
        type={'file'}
        name={name}
        className={className}
        onChange={uploadHandler}
        accept={accept}
        multiple={multipleFiles}
      />
    );
}

FileUploadButton.propTypes = {
    name: PropTypes.string.isRequired,
    uploadHandler: PropTypes.func.isRequired,
    className: PropTypes.string,
    accept: PropTypes.string,
    multipleFiles: PropTypes.bool
}

export default FileUploadButton;