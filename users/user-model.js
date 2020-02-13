const db = require('../data/db-config');

module.exports = {
    getUsers,
    getUserBy,
    add
}

function getUsers() {
    return db('users').select('id', 'username');
}

function getUserBy(filter) {
    return db('users').select('id', 'username', 'password').where(filter);
}

function add(newUser) {
    return db('users').insert(newUser, 'id')
        .then(ids => {
            const [id] = ids;
            return getUserBy({id});
        })
}