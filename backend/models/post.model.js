// Model definition for the Post data entity.

// Package Imports
const mongoose = require('mongoose');

// Schema Definition
const postSchema = new mongoose.Schema({
    imageURL: {
        type: String,
        required: true,
        unique: false
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
        default: { "like": 0, "dislike": 0, "love": 0, "laugh": 0, "fire": 0 }
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

// Virtuals are derived document properties that can be used within the application but do not persist through to MongoDB
// Self-referencing virtual to get all replies to a post.
postSchema.virtual("replies", {
    ref: "Post",
    localField: "_id",
    foreignField: "replyTo"
});

// Virtual to populate the user for a post. Replaces the userID field with the entire user document as an array.
postSchema.virtual("user", {
    ref: "User",
    localField: "userID",
    foreignField: "_id"
});

// Model definition from Schema
const Post = mongoose.model('Post', postSchema);

// Exporting Post Model to be used in routes.
module.exports = Post;