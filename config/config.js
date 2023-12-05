require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "host":process.env.POSTGRES_HOST,
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
    "username": "postgres",
    "password": "12345",
    "database": "transmon_test",
    "port": 5000,
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }

}
