const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    imageURL: { 
        type: String,
        required: true,
        unique: true
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
    }
}, {
    timestamps: true,
});

postSchema.virtual("replies", {
    ref: "Post",
    localField: "_id",
    foreignField: "replyTo"
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;