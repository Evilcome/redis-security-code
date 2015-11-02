# redis-security-code
A simple security code generator based on redis client. Security code, Verify, Verification code, 验证码.

## Usage

```
'use strict';

var RedisSecurityCode = require('redis-security-code');
var redisHelper = require('./redis');

RedisSecurityCode.init({
    client: redisHelper.getCodeClient(),    // a redis client is required.
    ttl: 10 * 60   // = 10 mins. Default
});

var TAG = {
    REGISTER: 'register',
    FIND_PASSWORD: 'find_password'
};

module.exports.TAG = TAG;

module.exports.generateRegisterCode = function(phoneNumber, callback) {
    RedisSecurityCode.generateForTag(phoneNumber, TAG.REGISTER, callback);
};

module.exports.verifyRegisterCode = function(phoneNumber, code, callback) {
    RedisSecurityCode.verifyForTag(phoneNumber, TAG.REGISTER, code, callback);
};

module.exports.generateFindPwdCode = function(phoneNumber, callback) {
    RedisSecurityCode.generateForTag(phoneNumber, TAG.FIND_PASSWORD, callback);
};

module.exports.verifyFindPwdCode = function(phoneNumber, code, callback) {
    RedisSecurityCode.verifyForTag(phoneNumber, TAG.FIND_PASSWORD, code, callback);
};
```
