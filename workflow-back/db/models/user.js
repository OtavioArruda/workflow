const mongooseCon = require('../mongooseConnection');

const userSchema = new mongooseCon.Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongooseCon.model('users', userSchema);