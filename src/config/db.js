/*const { Pool } = require("pg")

module.exports = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: "localhost",
    port: 5432,
    database: "foodfy"
})*/

var mysql = require('mysql');

module.exports = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DB
  });