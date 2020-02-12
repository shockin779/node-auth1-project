const express = require('express');
const apiRouter = require('./api/apiRouter');
const server = express();

server.use(express.json());

server.use('/api', apiRouter);

server.get('/', (req, res) => {
    res.status(200).json({message: 'API is up and running'});
})

module.exports = server;