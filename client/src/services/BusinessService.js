/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.18
 *
 * @Description: service used to make API calls related to businesses
 *
 */

let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3001';
}

const getBusinessAccountInfo = () => {
    return fetch(`${DEV_URL}/business/info/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });
}


const updateBusinessAccountInfo = (businessAccountInfo) => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(businessAccountInfo)
    }

    return fetch(`${DEV_URL}/business/update/`, request);
}

const getLiveBusinessListings = () =>
    fetch(`${DEV_URL}/business/listings/live/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });

const getInactiveBusinessListings = () =>
    fetch(`${DEV_URL}/business/listings/inactive/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });

const getRejectedBusinessListings = () =>
    fetch(`${DEV_URL}/business/listings/rejected/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });

module.exports = {
    getBusinessAccountInfo,
    updateBusinessAccountInfo,
    getLiveBusinessListings,
    getInactiveBusinessListings,
    getRejectedBusinessListings
}
