# Keycloak Security Module

## Example

## Installing module
```
$ npm install keycloak-security  --save    
```


## index.js
```
const Auth = require('./lib/auth');

const config = {
	"basic": {
		"username": "services",
		"password": "MyPwd"
	},
	"bearer": {
		"keycloak_url": "http://localhost:8080",
		"realm": "MyDemo",
		"client_id": "my-react-client",
		"cache":{
			"cert": {
				"ttl": 10000,
				"stale_ttl": 100000,
				"stale_short_ttl": 1000
			}
		}
	}
}

const auth = new Auth(config);

async function test(){
	try{
		var authorization = await auth.validate("Bearer ${token}");
		console.log(authorization);
		console.log(authorization.hasRole("example-admin"))
		
		var authorization = await auth.validate("Basic ${credentials}");
		console.log(authorization);
	}
	catch(error){
		console.log(error)
	}
}

test()
```

## Get user id

```
app.get('/brand/:id', protect("example-admin"),  function (req, res, next) {
  
  res.send({ userId: res.locals.user, authenticated: res.locals.authenticated});
});

```
| Element | Description |
| ------ | ------ |
| authorization.user.userId | Identification user in keycloak (sub) | 
| authorization.user.username | the username in keycloak (preferred_username) | 
| authorization.isAuthenticated | if user is authenticated | 
| authorization.roles | list of roles that user have. | 
| authorization.hasRole(name) | check if have the role name | 


## Configuration
### Example
```
const config = {
	"basic": {
		"username": "services",
		"password": "MyPwd"
	},
	"bearer": {
		"keycloak_url": "http://localhost:8080",
		"realm": "MyDemo",
		"client_id": "my-react-client",
		"cache":{
			"cert": {
				"ttl": 10000,
				"stale_ttl": 100000,
				"stale_short_ttl": 1000
			}
		}
	}
}

const protect = new Security(config);

```
### Properties
| Element | Description | Default |
| ------ | ------ | ------ | 
| basic | For use basic authentication, this is optional | |
| basic.username | Username of basic auth  | |
| basic.password | Password of basic auth | |
| bearer | For use bearer authentication, this is optional | |
| bearer.keycloak_url | Url of Keycloak | |
| bearer.realm | Realm of Keycloak | |
| bearer.client_id | Client Id of application that is configured in keycloak | |
| bearer.cache | Cache options, this is optional but if not defined will be using defaults values | |
| bearer.cache.cert.ttl | TTL of certification cache| 10 min |
| bearer.cache.cert.stale_ttl | TTL of certification stale cache | 1 day |
| bearer.cache.cert.stale_short_ttl | | 1 min |


