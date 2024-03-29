'use strict';
const crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

module.exports = { 
  createPasswordHash: (password) => {
    const newPass = sha512(password, genRandomString(16));
    return {
      salt: newPass.salt,
      password_hash: newPass.passwordHash
    };
  },
  checkPasswordHash: (passwordToCheck, storedHash) => {

    let pass = sha512(passwordToCheck, storedHash.salt);

    return (pass.passwordHash == storedHash.password_hash);
  }
}

 