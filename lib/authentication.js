
class Authentication {
  constructor({type,  user, authenticated, roles, clientId, ...rest }) {
    Object.assign(this, rest);

    this.user = user || null;
    this.clientId = clientId || null;
    this.roles = roles || [];
    this.isAuthenticated = authenticated || false;
  }

  hasRole(role) {
  	return this.roles && this.roles.includes(role);
  }
}

module.exports = Authentication;