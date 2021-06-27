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
    fd.set('listingId', listingId);
    images.forEach((image) => {
        fd.append('images', image);
    });

    const request = {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        body: fd
    }

    return fetch(`${DEV_URL}/listing/pictures/upload/`, request);
}

export const editListingImages = (listingId, images) => {
    const fd = new FormData();
    images.forEach(image => {
        fd.append('images', image);
    });

    const request = {
        method: 'POST',
        credentials: 'include',
        withCredentials: true,
        body: fd
    }

    return fetch(`${DEV_URL}/listing/images/edit?listingId=${listingId}`, request);
}
