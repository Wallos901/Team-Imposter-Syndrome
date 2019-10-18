/* 
    Code inspired from https://mongoosejs.com/docs/models.html
    Model definition for the User data entity.
*/

// Package Imports
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/*
    Schema Definition

    username        - String value storing the username of the user.
    password        - String value storing the hashed value of the user's password.
    email           - String value storing the email of the user.
    post_reactions  - Map object containing key value pairs of a post ID and the type of reaction: like, dislike, love, laugh, or fire.
    reaction_count  - Count of the total reactions to user's posts, used for leaderboard filtering.
    post_count      - Count of the user's total posts, used for leaderboard filtering.
    last_activity   - Date value that tracks the time of the user's last interaction with the system.
    last_IP         - String value that contains the IP address of where the user last accessed the system.
    is_moderator    - Boolean value determining if the user is a moderator and has access to moderator priviledges.
    is_admin        - Boolean value determining if the user is a admin and has access to admin priviledges.
    user_status     - Used to determine whether the user is allowed to make posts in the application; values: VERIFIED, NEEDS VERIFICATION, TERMINATED

    timestamps      - Mongoose attribute that creates two extra attributes ~ 'createdAt' and 'updatedAt'.
*/
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    post_reactions: { 
        type: Map, 
        of: String, 
        default: {} 
    },
    reaction_count: { 
        type: Number, 
        default: 0 
    },
    post_count: { 
        type: Number, 
        default: 0 
    },
    last_activity: { 
        type: Date, 
        default: Date.now() 
    },
    last_IP: { 
        type: String, 
        default: "0.0.0.0" 
    },
    is_moderator: { 
        type: Boolean,
        default: false 
    },
    is_admin: { 
        type: Boolean, 
        default: false 
    },
    user_status: { 
        type: String, 
        default: "VERIFIED" 
    }
}, {
    timestamps: true,
});

// Method to generate a hash of the user's given password. Run on registration or password change.
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// Method to check whether the input password matches the stored hash. Run on login attempt.
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// Model definition from Schema
const User = mongoose.model('User', userSchema);

// Exporting User Model to be used in routes.
module.exports = User;