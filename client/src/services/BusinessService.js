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

const getBusinessAccountInfo = () =>
    fetch(`${DEV_URL}/business/info/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });