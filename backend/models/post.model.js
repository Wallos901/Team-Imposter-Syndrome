const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    imageURL: {
        type: String,
        required: true,
    },
    replyTo: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        default: null
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reactions: {
        type: Map,
        of: Number,
        default: { "like": 0, "dislike": 0, "love": 0, "fire": 0 }
    },
    deleted: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        default: null
    },
    reports: {
        type: Array,
        of: String,
        default: []
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

postSchema.virtual("replies", {
    ref: "Post",
    localField: "_id",
    foreignField: "replyTo"
});

postSchema.virtual("user", {
    ref: "User",
    localField: "userID",
    foreignField: "_id"
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;