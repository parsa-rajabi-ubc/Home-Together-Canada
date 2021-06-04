/**
 * @Author:     Rachelle Gelden
 * @Created:    2021.01.12
 *
 * @Description: utils used to interact with photos
 *
 */

let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
    DEV_URL = 'http://localhost:3001';
}

export const getImageURL = (address) => {
    const URL = `${DEV_URL}\\${address}`;
    return URL.replaceAll('\\', '/');
}
