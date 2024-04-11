const mongoose = require('mongoose');
const mongooseCon = require('../mongooseConnection');

const projectSchema = new mongooseCon.Schema({
    name: String,
    participants: [{ type: mongoose.ObjectId, ref: 'users' }],
    folders: [{ type: mongoose.ObjectId, ref: 'folders' }],
    user: { type: mongoose.ObjectId, ref: 'users' }
});

module.exports = mongooseCon.model('projects', projectSchema);