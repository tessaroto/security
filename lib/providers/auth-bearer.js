
const TokenIntrospector = require('../token-introspector');
const Authentication = require("../authentication")
const BearerConfig = require("../config/bearer-config")

class Bearer {

  constructor({config, ...rest }) {
    Object.assign(this, rest);
    this.config = config;
    this.tokenIntrospector = new TokenIntrospector({bearerConfig: config});
    this.userIdAttribute = this.config.userIdAttribute || "sub";
  }

  async validate(token) {
    let error = null;
    let errorDetails = null;
    let roles = [];
    try {
      // Verify and decode the token
      const decoded = await this.tokenIntrospector.introspect(token);

      if (decoded == null)
        return new Authentication({
            authenticated: false,
            error: "Failed in verify and decode the token",
          });          

      if (!decoded.resource_access) 
        return new Authentication({
            authenticated: false,
            error: `Token of user : ${decoded.sub} haven't any permissions`,
          });          

      if (this.config.clientId)
        if (!decoded.resource_access[this.config.clientId]){
          return new Authentication({
            authenticated: false,
            error: `Token haven't permission for use the client_id: ${this.config.clientId}`,
          });
        }
        else
          roles = decoded.resource_access[this.config.clientId].roles 
    

      return new Authentication({
        method: "Bearer",
        roles: roles,
        authenticated: true,
        token: decoded,
        acessToken: token,
        user: {
          userId: decoded.sub,
          username: decoded.preferred_username
        }
      }); 
    } catch (error) {
      return new Authentication({
        authenticated: false,
        error: "Token isn't valid!",
        errorDetails: error
      });
    }
  }
}

module.exports = Bearer;
