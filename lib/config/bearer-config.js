const BearerCache = require("./bearer-cache")

class BearerConfig {
  constructor({config, ...rest }) {
    config = config || {};
    this.keycloakUrl = config.keycloak_url || null;
    this.realm = config.realm || null;
    this.clientId = config.client_id || null;
    this.cache = new BearerCache({config: config.cache});

    
  }
}

module.exports = BearerConfig;
