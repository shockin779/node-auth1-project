const express = require('express');
const apiRouter = require('./api/apiRouter');
const server = express();
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const sessionConfig = {
    name: 'jedi',
    secret: 'yummyinmytummy',
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
  
    store: new knexSessionStore({
      knex: require('./data/db-config'),
      tablename: 'sessions',
      sidfieldname: 'sid',
      createtable: true,
      clearInterval: 1000 * 60 * 60
    })
}

server.use(express.json());
server.use(session(sessionConfig));

server.use('/api', apiRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: 'API is up and running'});
})

module.exports = server;