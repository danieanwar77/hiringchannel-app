const mysql = require ('mysql');
require('dotenv/config')

const connect = mysql.createConnection ({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DB_NAME,
});

connect.connect (function (err) {
  if (err) throw err;
});

module.exports = connect;