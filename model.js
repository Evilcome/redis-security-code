'use strict';

module.exports = {

    client: null,

    ttl: null,

    get: function(key, callback) {
        if(this.client) this.client.get(key, callback);
    },

    set: function(key, value, callback) {
        if(this.client) this.client.set(key, value, callback);
        if(this.ttl) this.client.expire(key, this.ttl);
    }
};
