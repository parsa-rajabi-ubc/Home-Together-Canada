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

export const searchMemberProfiles = (searchFilters) => {
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

export const getMemberAccountInfo = () => {
    return fetch(`${DEV_URL}/member/info/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });
}

export const updateMemberAccountInfo = memberAccountInfo => {
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

export const getMemberProfileInfo = () => {
    return fetch(`${DEV_URL}/member/profile/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });
}

export const updateMemberProfile = memberProfileInfo => {
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

export const updateMemberStatus = (status, roommates) => {
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

export const updateMemberAreasOfInterest = areasOfInterest => {
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

export const getActiveStatus = () =>
    fetch(`${DEV_URL}/member/active/status/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });

export const activateAccount = () =>
    fetch(`${DEV_URL}/member/activate/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });

export const deactivateAccount = reason => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({ reason })
    }
    return fetch(`${DEV_URL}/member/deactivate/`, request);
}
