/*
    Code inspired from https://mongoosejs.com/docs/models.html
    Model definition for the Post data entity.
*/

// Package Imports
const mongoose = require('mongoose');

/*
    Schema Definition

    imageURL   - The image url connecting to the S3 bucket holding all images uploaded to the application.
    replyTo    - Foreign key refering to the parent post of the current post. If this value is null, it is a post, if it is populated, it is a comment with a parent post.
    userID     - Foreign key linking back to the user's document ID. Used to populate the 'user' virtual.
    reactions  - A count of the total number of all reaction types, updated when a user reacts to the post.
    deleted    - Flag determining whether a post has been deleted. If true it will not be shown in the application.
    category   - String value pertaining to the category this post belongs to; values: Animal, Fashion, Funny, Landscape, Nature, Random, Sports, Travel, Vehicle.
    reports    - Array of user IDs, each entry is a user that has reported the post.

    timestamps - Mongoose attribute that creates two extra attributes ~ 'createdAt' and 'updatedAt'.
    toJSON     - Setting virtuals to true allows the populates virtual attributes to be returned to the application using the res.json() method.
*/
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