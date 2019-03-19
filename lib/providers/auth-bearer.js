
const TokenIntrospector = require('../token-introspector');
const Authentication = require("../authentication")
const BearerConfig = require("../config/bearer-config")

class Bearer {

  constructor({config, ...rest }) {
    Object.assign(this, rest);
    this.config = config;
    this.tokenIntrospector = new TokenIntrospector({bearerConfig: config});
  }

  async validate(token) {
    let error = null;
    let errorDetails = null;
    try {
      // Verify and decode the token
      const decoded = await this.tokenIntrospector.introspect(token);
      if (decoded != null){

        if (decoded.resource_access && decoded.resource_access[this.config.clientId]){

          return new Authentication({
              method: "Bearer",
              roles: decoded.resource_access[this.config.clientId].roles,
              authenticated: true,
              user: {
                userId: decoded.sub,
                username: decoded.preferred_username
              }
            });
        }
        else
          error = `Token no have client_id: ${this.config.clientId}`;  
      }
      else
        error = "Failed in verify and decode the token";

    } catch (error) {
      error = "Token is not valid! ";
      errorDetails = error;
    }

    return new Authentication({
        authenticated: false,
        error: error,
        errorDetails: errorDetails
      });
  }
}

module.exports = Bearer;
