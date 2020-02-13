const express = require('express');
const Users = require('./user-model');
const router = express.Router();
const bcrypt = require('bcryptjs');

router.get('/', auth, (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.status(500).json({message: `An error occured retrieving users: ${err}`}));
});

function auth(req, res, next) {
    const {username, password} = req.headers;
    Users.getUserBy({username})
        .then(foundUser => {
            const [user] = foundUser
            if(user && bcrypt.compareSync(password, user.password)) {
                next();
            }
            else {
                res.status(404).json({message: 'Invalid credentials'})
            }
        })
        .catch(err => res.status(500).json({message: `An error occured logging in: ${err}`}))
}

module.exports = router;