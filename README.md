# Node.js Project Example with Express and Sequelize ORM

This project run on Node.js and Postgres database management. 

## Fork and clone this repository
``` bash
$ git clone <URL>
```


# Install dependencies
## External dependencies
``` bash
$ sudo npm install -g sequelize-cli
$ sudo npm install -g nodemon
```

## Project dependencies
``` bash
$ npm install
```
# Setup database

Set your own db configuration editing ./dao/config.js and ./config/config.json files

### config.js
``` js
'use strict'

module.exports = {
  database: process.env.DB_NAME || 'database_development',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres123',
  hostname: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  logging: console.log,
  logging: (str) => {
    console.log('[database]', str)
  }
}
```

### config.json
``` JSON
{
  "development": {
    "username": "postgres",
    "password": "postgres123",
    "database": "database_development",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "localhost",
    "dialect": "postgres"
  }
}
```

## Finally use `sequelize-cli` to create db and tables
``` bash
$ sequelize db:create
$ sequelize db:migrate
```

# Run project and test endpoints
Can use POSTMAN fake client to test this project. This API support GET and POST methods HTPP 
``` bash
$ npm start # or use nodemon
```

## Endpoints

### GET `/users`
``` javascript
HTTP/1.1 200 OK
// returns all users saved
```


### POST `/users`

``` js
/**
 * @apiParam {String} uuid      User identifier to update or null to create new.
 * @apiParam {String} email     Any valid email address.
 * @apiParam {String} password  Any password string.
*/

HTTP/1.1 201 Created
{
    "uuid": "XXXXXXXXXXXX...",
    "email": "example@domain.com",
    "password": "******"
}

```

