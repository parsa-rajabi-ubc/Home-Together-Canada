const crypto = require('crypto');

const getSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

const getHashedPassword = function(aPassword, aSalt) {
    if (!aPassword || !aSalt) return '';
    // refer to https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2sync_password_salt_iterations_keylen_digest
    return crypto.pbkdf2Sync(aPassword, aSalt, 10000, 64, 'sha512').toString();
};

module.exports = {
    getSalt,
    getHashedPassword
}