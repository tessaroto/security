const BasicConfig = require("./config/basic-config")
const BearerConfig = require("./config/bearer-config")

const Basic = require("./providers/auth-basic")
const Bearer = require("./providers/auth-bearer")

const Authentication = require("./authentication")

class Auth {

  constructor({basic, bearer }) {
    
    if (basic){
      const config = new BasicConfig({config: basic});
      this.basicProvider = new Basic({config: basic})
    }

    if (bearer){
      const config = new BearerConfig({config: bearer});
      this.bearerProvider = new Bearer({config: config});
    }
  }

  async validate(authorization_header) {
    var error;
    var errorDetails;

    try{
        if (authorization_header.startsWith("Bearer") && this.bearerProvider){
          // Get the token from the Authorization header, skip 'Bearer ' prefix
          const token = authorization_header.substr(7);

          return await this.bearerProvider.validate(token);
        }
        else if (authorization_header.startsWith("Basic") && this.basicProvider){
          // Get the credentials from the Authorization header, skip 'Basic ' prefix
          const credentials = authorization_header.substr(6);
          
          return await this.basicProvider.validate(credentials);
        }
        else
          error = "Authentication not supported."
    }
    catch(error){
      error = "authorization validation error";
      errorDetails = error;
    }

    return new Authentication({
        authenticated: false,
        error: error,
        errorDetails: errorDetails
      });
  }
}

module.exports = Auth;
