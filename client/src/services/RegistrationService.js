/**
 * @Author:     Rachelle Gelden
 * @Created:    2020.11.17
 *
 * @Description: service used to make API calls related to registration
 *
 */

let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3001';
}

const registerBusinessUser = (businessUserData) => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(businessUserData)
    }

    return fetch(`${DEV_URL}/business/create`, request);
}

const registerMemberUser = (memberUserData) => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(memberUserData)
    }

    return fetch(`${DEV_URL}/member/create`, request);
}

module.exports = {
    registerBusinessUser,
    registerMemberUser
}