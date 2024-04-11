const mongooseCon = require('../mongooseConnection');

const columnSchema = new mongooseCon.Schema({
    name: String
});

module.exports = mongooseCon.model('columns', columnSchema);