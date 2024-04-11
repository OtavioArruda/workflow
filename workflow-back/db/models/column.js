const mongoose = require('mongoose');
const mongooseCon = require('../mongooseConnection');

const columnSchema = new mongooseCon.Schema({
    name: String,
    tasks: [{ type: mongoose.ObjectId, ref: 'tasks' }]
});

module.exports = mongooseCon.model('columns', columnSchema);