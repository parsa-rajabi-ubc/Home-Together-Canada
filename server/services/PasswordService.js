const crypto = require('crypto');

const getSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

const getHashedPassword = function(aPassword, aSalt) {
    if (!aPassword || !aSalt) return '';
    return crypto.pbkdf2Sync(aPassword, aSalt, 10000, 64, 'sha512').toString();
};

module.exports = {
    getSalt,
    getHashedPassword
}