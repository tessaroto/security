const cache = require('memory-cache');
const KeyCloakCerts = require('get-keycloak-public-key');

const cacheKey = (realm, kid) => {
	return "Cert:" + realm + "-" + kid;
}

const staleCacheKey = (realm, kid) => {
	return cacheKey(realm, kid) + "-Stale";
}

class KeyCloakCert {
  constructor({keycloakUrl, realm, cache}) {
  	this.keycloakUrl = keycloakUrl;
  	this.realm = realm;
  	this.cache = cache;
  	this.keyCloakCerts = new KeyCloakCerts(this.keycloakUrl, this.realm);
  }

  async get(kid){
		const key = cacheKey(this.realm, kid);
		const staleKey = staleCacheKey(this.realm, kid);

		var cert = cache.get(key);
		
		if (cert == null){

			//Expired the cache of public certificate, I will fetch on keycloak.
			cert = await this.keyCloakCerts.fetch(kid).catch((e)=>{
		      console.log(e);
		    });

		    if (cert != null){
		    	//I put keycloak cert to cache and stale cache
				cache.put(key, cert, this.cache.ttl);
				cache.put(staleKey, cert, this.cache.staleTtl);
		    }
		    else{
		    	//Cert from keycloak is null, I will use old cert :/
		    	cert = cache.get(staleKey);
		    	//if use stale cache, I will put stale to main cache by short ttl
		    	cache.put(key, cert, this.cache.staleShotTtl);
		    }	
		}

		return cert;
	}
}

module.exports = KeyCloakCert;