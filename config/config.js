require('dotenv').config();

module.exports = {
  "development": {
    "username": "default",
    "password": "4GQPtrKc5hwj",
    "database": "verceldb",
    "host": "ep-square-salad-16957691-pooler.ap-southeast-1.postgres.vercel-storage.com",

    
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true, // Force SSL
        "rejectUnauthorized": false, // Bypass certificate validation (use with caution)
        },
        "sslmode": 'require', // Specify sslmode here
      }
  },
  "test": {
    "username": "default",
    "password": "6WolGL1hexBn",
    "database": "verceldb",
    "dialect": "postgres",
    "host": "ep-bitter-bread-48186980-pooler.us-east-1.postgres.vercel-storage.com",

  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }

}
