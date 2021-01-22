/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.21
 *
 * @Description: service used to make API calls related to members
 *
 */

let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3001';
}

const searchMemberProfiles = (searchFilters) => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(searchFilters)
    }

    return fetch(`${DEV_URL}/member/search/profiles/`, request);
}

module.exports = {
    searchMemberProfiles
}
