const express = require('express');
const Users = require('./user-model');
const router = express.Router();

router.get('/', (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.status(500).json({message: `An error occured retrieving users: ${err}`}));
});

module.exports = router;