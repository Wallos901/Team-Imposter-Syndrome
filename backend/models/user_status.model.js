const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user_statusSchema = new Schema({
    name: { type: String, required: true }
});

const User_Status = mongoose.model('User_Status', user_statusSchema);

module.exports = User_Status;