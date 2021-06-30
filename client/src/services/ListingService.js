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

export const searchListings = (searchFilters) => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({...searchFilters})
    }

    return fetch(`${DEV_URL}/listing/search/`, request);
}

export const deleteListing = (listingID) => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({...listingID})
    }
    return fetch(`${DEV_URL}/listing/delete/`, request);
}

export const editListing = listingData => {
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

    return fetch(`${DEV_URL}/listing/edit/`, request);
}

export const deleteListingImages = (listingId, deletedImages) => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({
            listingId,
            deletedImages
        })
    }

    return fetch(`${DEV_URL}/listing/images/delete/`, request);
}
