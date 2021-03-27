/**
 * @Author:     Alex Qin
 * @Created:    2020.03.24
 *
 * @Description: Message services for connect backend to frontend
 *
 */
let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3001';
}

export const sendMessage = (newMessage) => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(newMessage)
    }

    return fetch(`${DEV_URL}/message/create/`, request);
}

export const getAllMessagesForOneUser = () => {
    return fetch(`${DEV_URL}/message/one/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });
}

export const getAllMessagesForAllUser = () => {
    return fetch(`${DEV_URL}/message/all/`, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include'
    });
}