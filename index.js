'use strict';
var assert = require('assert');
var model = require('./model');

var SecurityCode = {
    _inited: false,
    length: 6,
    options: null
};

module.exports.defaultGenerator = function(length) {
    var baseStr = "1234567890";
    length = length || SecurityCode.length;

    var code = [];
    var source = baseStr.split("");

    for(var i = 0; i < length; i++) {
        code.push(source[parseInt(Math.random() * source.length)]);
    }

    return code.join("");
};

module.exports.init = function(options) {
    assert(options.client, 'An redis client is required.');

    model.client = options.client;
    if(options.ttl) model.ttl = options.ttl;
    if(options.length) SecurityCode.length = options.length;
    SecurityCode.options = options;

    SecurityCode._inited = true;
};

module.exports.generate = function(key, callback) {
    module.exports.generateForTag(key, '', callback);
};

module.exports.verify = function(key, code, callback) {
    module.exports.verifyForTag(key, '', code, callback);
};

module.exports.generateForTag = function(key, tag, callback) {
    assert(SecurityCode._inited, 'You should call RedisSecurityCode.init first.');
    callback = callback || function() {};

    var key = key + ':' + tag;
    var code = module.exports.defaultGenerator();
    model.set(key, code, function(err, ret) {
        if(err) return callback(err);

        if(ret === 'OK') {
            callback(null, code);
        } else {
            callback(ret);
        }
    });
};

module.exports.verifyForTag = function(key, tag, code, callback) {
    assert(SecurityCode._inited, 'You should call RedisSecurityCode.init first.');
    callback = callback || function(){};

    var result = { match: false };

    var key = key + ':' + tag;
    model.get(key, function(err, value) {
        if(err) return callback(err);

        if(value === code) {
            result.match = true;
        }

        callback(null, result);
    });
};
