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
            .then(newUser => {
                [newUser] = newUser;
                res.status(201).json(newUser);
            })
            .catch(err => res.status(500).json({message: `An error occured creating user: ${err}`}));
    }
})

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    Users.getUserBy({username})
        .then(foundUser => {
            const [user] = foundUser
            if(user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({message: `Login successful! Welcome ${user.username}`});
            }
            else {
                res.status(404).json({message: 'Invalid credentials'})
            }
        })
        .catch(err => res.status(500).json({message: `An error occured logging in: ${err}`}))

})

router.get('/logout', (req, res) => {
    if(req.session.user) {
        req.session.destroy(err => {
            if(err) {
                res.status(200).send('There was an issue logging you out!')
            } else {
                res.status(200).send('You were never here!')
            }
        })
    } else {
        res.end('You were not logged in');
    }
})

module.exports = router;