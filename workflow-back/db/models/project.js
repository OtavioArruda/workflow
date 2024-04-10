const mongoose = require('mongoose');
const mongooseCon = require('../mongooseConnection');

const columnSchema = new mongooseCon.Schema({
    name: String
});

const folderSchema = new mongooseCon.Schema({
    name: String,
    columns: {
        type: [columnSchema],
        default: []
    },
});

const projectSchema = new mongooseCon.Schema({
    name: String,
    participants: [mongoose.ObjectId],
    folders: {
        type: [folderSchema],
        default: []
    },
    user_id: mongoose.ObjectId
});

module.exports = mongooseCon.model('projects', projectSchema);