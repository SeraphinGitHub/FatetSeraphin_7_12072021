
module.exports = {

  "development": {
    "database": process.env.DB_Name,
  "username": process.env.DB_Username,
  "password": process.env.DB_Password,
  "host": process.env.DB_Host,
  "port": process.env.DB_Port,
  "dialect": "mysql"
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
};