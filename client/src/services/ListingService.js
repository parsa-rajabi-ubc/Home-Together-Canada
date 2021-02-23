/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.02.21
 *
 * @Description: service used to make API calls related to listings
 *
 */

let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3001';
}

export const createListing = (listingData) => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(listingData)
    }

    return fetch(`${DEV_URL}/listing/create/`, request);
}


