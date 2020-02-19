const Users = require('../users/user-model');;

module.exports = (req, res, next) => {
    if(req.session && req.session.user) {
        console.log(req.session.user)
        next();
    } else {
        res.send('You shall not pass!');
    }
}