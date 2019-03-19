const BasicConfig = require("../config/basic-config")
const Authentication = require("../authentication")

class Basic {

  constructor({config, ...rest }) {
    Object.assign(this, rest);
    this.config = config;
  }

  async validate(credentials) {
    let error = null;
    let errorDetails = null;

    // create a buffer and tell it the data coming in is base64
    const buf = Buffer.from(credentials, 'base64'); 
    // read it back out as a string
    const plain_auth = buf.toString();        

    // At this point plain_auth = "username:password"
    const creds = plain_auth.split(':');
    const username = creds[0];
    const password = creds[1];

    if(username == this.config.username && password == this.config.password) {
        return new Authentication({
          method: "Basic",
          authenticated: true,
          user: {
            userId: null,
            username: username
          }
        });
    }
    else
        error = "invalid credentials";

    return new Authentication({
        authenticated: false,
        error: error,
        errorDetails: errorDetails
      });
  }
}

module.exports = Basic;
