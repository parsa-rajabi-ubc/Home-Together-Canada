/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.21
 *
 * @Description: service used to make API calls related to login and authentication
 *
 */

let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3001';
}

const loginUser = (loginData) => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(loginData)
    }

    return fetch(`${DEV_URL}/user/login/`, request);
}

const isLoggedIn = () =>
    fetch(`${DEV_URL}/user/checkAuth/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });


const logoutUser = () =>
    fetch(`${DEV_URL}/user/logout/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });


module.exports = {
    loginUser,
    isLoggedIn,
    logoutUser
}