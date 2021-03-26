/**
 * @Author:     Alex Qin
 * @Created:    2020.03.24
 *
 * @Description: Message services
 *
 */
let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3001';
}

export const sendMessage = (message) => {
    const request = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify(message)
    }

    return fetch(`${DEV_URL}/message/create/`, request);
}