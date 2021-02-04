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

const getMemberAccountInfo = () => {
    return fetch(`${DEV_URL}/member/info/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });
}

const updateMemberAccountInfo = memberAccountInfo => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(memberAccountInfo)
    }
    return fetch(`${DEV_URL}/member/info/update/`, request);
}

const getMemberProfileInfo = () => {
    return fetch(`${DEV_URL}/member/profile/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });
}

const updateMemberProfile = memberProfileInfo => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(memberProfileInfo)
    }
    return fetch(`${DEV_URL}/member/profile/update/`, request);
}

const updateMemberStatus = (status, roommates) => {
    const body = {
        status: status,
        ...roommates
    };

    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(body)
    }
    return fetch(`${DEV_URL}/member/profile/status/update/`, request);
}

const updateMemberAreasOfInterest = areasOfInterest => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({areasOfInterest: areasOfInterest})
    };
    return fetch(`${DEV_URL}/member/profile/areasOfInterest/update/`, request);
}

module.exports = {
    searchMemberProfiles,
    getMemberAccountInfo,
    updateMemberAccountInfo,
    getMemberProfileInfo,
    updateMemberProfile,
    updateMemberStatus,
    updateMemberAreasOfInterest
}
