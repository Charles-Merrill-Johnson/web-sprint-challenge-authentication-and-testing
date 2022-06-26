const db = require('../../data/dbConfig');

function findById(id) {
    return db('users').where({id}).first();
}

function insert(user) {
    return db('users')
        .insert(user)
        .then(([id]) => findById(id));
}

function findBy(filter) {
    return db("users").where(filter).first();
  }

module.exports = {
    findById,
    insert,
    findBy,
}