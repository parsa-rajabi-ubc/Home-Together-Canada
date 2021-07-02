/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.12
 *
 * @Description: service used to make API calls related to file upload
 *
 */

let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3001';
}

const uploadLogo = image => {
    const fd = new FormData();
    fd.append('image', image);

    const request = {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        body: fd
    };

    return fetch(`${DEV_URL}/business/logo/upload/`, request);
}

module.exports = {
    uploadLogo
}
