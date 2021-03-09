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

export const uploadLogo = image => {
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

export const uploadPictures = (images, listingId) => {
    const fd = new FormData();
    console.log('uploadPictures called...');
    console.log('images: ', images);
    console.log('listingId: ', listingId);
    images.forEach((image, index, array) => {
        fd.append('images', image);
    });
    fd.set('listingId', listingId);

    const request = {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        body: fd
    }
    console.log('fd: ', FormData);
    console.log('request: ', request);

    return fetch(`${DEV_URL}/listing/pictures/upload/`, request);
}

