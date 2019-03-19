
class CacheConfig {
  constructor({config, ...rest }) {
  	config = config || {};

		this.ttl = config.ttl;
    this.staleTTL = config.stale_ttl;
    this.staleShortTTL = config.stale_short_ttl;	
    
  	Object.assign(this, rest);
  }
}

module.exports = CacheConfig;
