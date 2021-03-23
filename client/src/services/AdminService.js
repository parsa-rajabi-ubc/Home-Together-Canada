/**
 * @Author:     Parsa Rajabi
 * @Created:    2021.03.13
 *
 * @Description: service used to make API calls related to admin
 *
 */

let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3001';
}

export const getAllAdmins = () => {
    return fetch(`${DEV_URL}/admin/all/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });
}
export const promoteMemberToAdmin = (memberUsername) => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(memberUsername)
    }
    return fetch(`${DEV_URL}/admin/create/`, request);
}

export const getAllBannedUsers = () => {
    return fetch(`${DEV_URL}/admin/banned/users/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });
}

export const banUsername = (username) => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(username)
    }
    return fetch(`${DEV_URL}/admin/ban/user/`, request);
}

export const exportMemberData = () => {
    return fetch(`${DEV_URL}/admin/export/members/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });
}

export const exportBusinessData = () => {
    return fetch(`${DEV_URL}/admin/export/businesses/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });
}
