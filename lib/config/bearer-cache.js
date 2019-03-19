const CacheConfig = require("./cache-config")

const certCacheDefault = {
	ttl: 600000,
	stale_ttl: 86400000,
	stale_short_ttl: 60000
}

class BearerCache {
  constructor({ config }) {
  	config = config || {};
    this.cert = new CacheConfig({config: config.cert || certCacheDefault});
  }
}

module.exports = BearerCache;

