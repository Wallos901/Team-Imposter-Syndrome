const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    hashed_password: { type: String, required: true },
    email: { type: String, required: true },
    created_at: { type: Date, required: true },
    last_activity: { type: Date, required: true },
    is_moderator: { type: Boolean, required: true },
    is_admin: { type: Boolean, required: true },
    status: { type: String, required: true},
    user_status_id: { type: String, required: true }
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;