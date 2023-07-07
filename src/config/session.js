const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const MySQLStore = require('express-mysql-session')(session);
const db = require('./db')

const sessionStore = new MySQLStore(db)

module.exports = session({
    store: sessionStore,
    secret: 'iabadabaduuuuu',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
})