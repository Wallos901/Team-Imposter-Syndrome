const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    content: { type: String, required: true },
    alt_text: { type: String, required: true },
    reactions: { type: Map, of: Number, default: { "like": 0, "dislike": 0, "love": 0, "fire": 0 }},
    user_id: { type: String, required: true },
    status: { type: String, default: "APPROVED" }
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;