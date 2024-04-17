const mongoose = require('mongoose');
const mongooseCon = require('../mongooseConnection');

const folderSchema = new mongooseCon.Schema({
    name: String,
    columns: [{ type: mongoose.ObjectId, ref: 'columns' }]
});

module.exports = mongooseCon.model('folders', folderSchema);