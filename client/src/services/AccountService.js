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

    return fetch(`${DEV_URL}/changePassword/`, request);
}

module.exports = {
    changePassword
}