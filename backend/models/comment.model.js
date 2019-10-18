/* 
    Code inspired from https://mongoosejs.com/docs/models.html
    Model definition for the Comment data entity.
    Unused, kept as legacy. Might be needed in future by other developers.
*/

// Package Imports
const mongoose = require('mongoose');

/*
    Schema Definition
    
    content   - the image url connecting to the S3 bucket holding all images uploaded to the application
    alt_text  - alternate text displayed if user has images turned off in their browser; set to a default value as user does not upload alt text
    user_id   - foreign key linking back to the user's document ID
    post_id   - foreign key linking back to the post's document ID, post being what the comment is in reply to
    status    - used to determine whether a post should be displayed or not; values: APPROVED, REJECTED, REPORTED
*/
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