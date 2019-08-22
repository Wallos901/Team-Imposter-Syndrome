const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: { type: String, required: true },
    alt_text: { type: String, required: true },
    user_id: { type: String, required: true },
    status_id: { type: String, required: true }
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;