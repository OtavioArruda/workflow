const mongoose = require('mongoose');
const mongooseCon = require('../mongooseConnection');

const badgeSchema = new mongooseCon.Schema({
    _id: false,
    text: String,
    color: String
});

const taskSchema = new mongooseCon.Schema({
    title: String,
    description: String,
    start_at: Date,
    end_at: Date,
    participants: [{ type: mongoose.ObjectId, ref: 'users' }],
    badges: [{ type: badgeSchema, default: {} }]
});

module.exports = mongooseCon.model('tasks', taskSchema);