const mongoose = require('mongoose');

const createUsers = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    following: [String],
    followers: [String]
});

const createUser = mongoose.model('Users', createUsers);
module.exports = createUser;