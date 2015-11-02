# redis-security-code
[![NPM](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/redis-security-code)
[![License](http://img.shields.io/badge/license-MIT-lightgrey.svg?style=flat)](http://mit-license.org)

A simple security code generator based on redis client. Security code, Verify, Verification code, 验证码.

## Install
`npm install redis-security-code --save`

## 中文说明
基于 Redis 的验证码生成器。
由于在 APP 和 H5 应用中，经常有需要向手机号发送验证码的需求。本模块利用已有的 [RedisClient](https://www.npmjs.com/package/redis) 来迅速的创建验证码，并提供标记`TAG`，及验证的功能。

推荐您使用 TAG 针对一个手机号标记不同类型的验证码。（如：用于注册，登录，忘记密码等等。）

## API

- init `RedisSecurityCode.init(options)`
    - options: 参数设置
        - client: 一个合法的RedisClient，可以由[redis](https://www.npmjs.com/package/redis)创建
        - ttl: 验证码的过期时间，默认为10分钟。
        - length: 验证码的长度，默认为6位。

- generateForTag `RedisSecurityCode.generateForTag(key, tag, cb)`
    - key: 键，通常是手机号
    - tag: 类型标志（推荐）
    - cb(err, code): 回调函数
        - err: 返回错误
        - code: 验证码

- verifyForTag `RedisSecurityCode.verifyForTag(key, tag, code, cb)`
    - key: 键，通常是手机号
    - tag: 类型标志（推荐）
    - code: 用于验证的验证码，由用户输入
    - cb(err, result): 回调函数
        - err: 返回错误
        - result: `{ match: true | false }` 当`match`为`true`时，验证成功。

- generate `RedisSecurityCode.generate(key, cb)`: same as `generateForTag` without tag

- verify `RedisSecurityCode.verify(key, code, cb)`: same as `verifyForTag` without tag


## 示例

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
