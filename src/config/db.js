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
    host: "localhost",
    user: "sqluser",
    password: "369369",
    port: 3306,
    database: 'nba'
  });