const crypto = require('crypto');

async function getHash(pwd) {
    return new Promise((resolve, reject) => {
        crypto.scrypt(pwd, 'salt', 64, (err, derivedKey) => {
            if (err) {
                reject(err);
            } else {
                resolve(derivedKey.toString('hex'));
            }
        });
    });
}

module.exports = getHash;
