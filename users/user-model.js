const db = require('../data/db-config');

module.exports = {
    getUsers,
    getUserById,
    add
}

function getUsers() {
    return db('users').select('id', 'username');
}

function getUserById(id) {
    return db('users').select('id', 'username').where({id});
}

function add(newUser) {
    return db('users').insert(newUser, 'id')
        .then(ids => {
            const [id] = ids;
            return getUserById(id);
        })
}