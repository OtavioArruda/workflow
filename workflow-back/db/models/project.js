const mongoose = require('mongoose');
const mongooseCon = require('../mongooseConnection');

const projectSchema = new mongooseCon.Schema({
    name: String,
    participants: [mongoose.ObjectId],
    user_id: mongoose.ObjectId
});

module.exports = mongooseCon.model('projects', projectSchema);