

module.exports = {
      "development": {
        "username": "postgres",
        "password": "12345",
        "database": "transmon",
        "host": "127.0.0.1",
        "port": "5000",
        "dialect": "postgres"
      },
      "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
      }
    
}
  