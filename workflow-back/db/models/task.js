const mongoose = require('mongoose');
const mongooseCon = require('../mongooseConnection');

const taskSchema = new mongooseCon.Schema({
    title: String,
    description: String,
    start_at: Date,
    end_at: Date,
    participants: [mongoose.ObjectId],
    column_id: mongoose.ObjectId
});

module.exports = mongooseCon.model('tasks', taskSchema);