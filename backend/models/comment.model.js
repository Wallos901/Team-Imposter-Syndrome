// Model definition for the Comment data entity.
// Unused, kept as legacy. Might be needed in future by other developers.

// Package Imports
const mongoose = require('mongoose');

// Schema Definition
const commentSchema = new mongoose.Schema({
    content: { 
        type: String,
        required: true
    },
    alt_text: {
        type: String, 
        required: true 
    },
    user_id: { 
        type: String, 
        required: true 
    },
    post_id: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        default: "APPROVED" 
    }
}, {
    timestamps: true,
});

// Model definition from Schema
const Comment = mongoose.model('Comment', commentSchema);

// Exporting Comment Model to be used in routes.
module.exports = Comment;