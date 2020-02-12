const express = require('express');
const bcrypt = require('bcryptjs');
const userRouter = require('../users/userRouter');
const Users = require('../users/user-model');
const router = express.Router();

router.use('/users', userRouter);

router.post('/register', (req, res) => {
    let {username, password} = req.body;

    if(!username || !password) {
        res.status(400).json({message: 'Please provide a username and password'});
    } else {
        const hash = bcrypt.hashSync(password, 8);
        password = hash;
        Users.add({username, password})
            .then(ids => {
                res.status(201).json(ids);
            })
            .catch(err => res.status(500).json({message: `An error occured creating user: ${err}`}));
    }
})

module.exports = router;