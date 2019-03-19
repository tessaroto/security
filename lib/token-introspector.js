const jwt = require('jsonwebtoken');
const KeyCloakCert = require('./keycloak-cert');
const Authentication = require("./authentication")

class Token {

  constructor({bearerConfig}) {
    
    this.certProvider = new KeyCloakCert({
      keycloakUrl: bearerConfig.keycloakUrl, 
      realm: bearerConfig.realm, 
      cache: bearerConfig.cache.cert
    });
  }

  async introspect (token) {
    try {
      // decode the token without verification to have the kid value
      const kid = jwt.decode(token, { complete: true }).header.kid;
      const publicKey = await this.certProvider.get(kid);
      // Verify and decode the token
      return  jwt.verify(token, publicKey);
    } 
    catch (error) {
      process.stderr.write(error.toString() + "\n");
    }
    return null;
  }
}

module.exports = Token;
