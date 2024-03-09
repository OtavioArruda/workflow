require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`)
    .then(() => {
        console.log('Database connection successful');
    })
    .catch(err => {
        console.log(`Database connection error: ${err}`);
    });

module.exports = mongoose;