"use strict";
exports.__esModule = true;
exports.decrypt = exports.encrypt = void 0;
var crypto = require("crypto");
var encrypt = function (data, secret) {
    var iv = crypto.randomBytes(16);
    var cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secret.padEnd(32, '0').slice(0, 32)), iv);
    var encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {
        iv: iv.toString('hex'),
        encrypted: encrypted.toString('hex')
    };
};
exports.encrypt = encrypt;
var decrypt = function (data, secret) {
    var iv = Buffer.from(data.iv, 'hex');
    var encryptedText = Buffer.from(data.encrypted, 'hex');
    var decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secret.padEnd(32, '0').slice(0, 32)), iv);
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};
exports.decrypt = decrypt;
