// Model definition for the User data entity.

// Package Imports
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema Definition
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