const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    post_reactions: { type: Map, of: String, default: {} },
    reaction_count: { type: Number, default: 0 },
    post_count: { type: Number, default: 0 },
    last_activity: { type: Date, default: Date.now() },
    is_moderator: { type: Boolean, default: false },
    is_admin: { type: Boolean, default: false },
    user_status: { type: String, default: "VERIFIED" }
}, {
    timestamps: true,
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;