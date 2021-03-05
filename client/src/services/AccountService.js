/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.04
 *
 * @Description: service used to make API calls related to users accounts
 *
 */

let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3001';
}

const changePassword = (passwordData) => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(passwordData)
    }

    return fetch(`${DEV_URL}/user/changePassword/`, request);
}

const deleteAccount = () =>
    fetch(`${DEV_URL}/user/delete/`, {
        method: 'GET',
        credentials: 'include',
        withCredentials: true
    });

module.exports = {
    changePassword,
    deleteAccount
}