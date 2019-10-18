
/*
    Definitions of all routes using the User Model.
*/

// Package Imports
const router = require('express').Router();
const jwt = require("jsonwebtoken");

// Middleware Imports
// const auth = require("../../utilities/auth/authMiddleware");

// Load Input Validation
const validateRegisterInput = require("../../utilities/validation/register.util");
const validateLoginInput = require("../../utilities/validation/login.util");
const validateUpdateInput = require("../../utilities/validation/update.util");

// Load ObjectId Type
const ObjectId = require("mongoose").Types.ObjectId;

// Load User Model
const User = require('../models/user.model');

// Load Post Model
const Post = require("../models/post.model");


// @route   GET api/users
// @desc    Return an array of all users stored in the database.
// @access  Public
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});


// @route   POST api/users/add
// @desc    Adds a user to the database based on the information passed into the route through request body.
// @access  Public
router.post('/add', (req, res) => {
    const { username, password, email, last_activity, is_moderator, is_admin, status, user_status_id }  = req.body;

    const newUser = new User({
        username,
        password,
        email,
        last_activity,
        is_moderator,
        is_admin,
        status,
        user_status_id
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// @route   POST api/users/update/{User ID}
// @desc    Updates the information of the user matching the user ID in the route to the information gained through the request body.
// @access  Public
router.post('/update/:id', (req, res) => {
    // Create variables from request fields.
    const { email, password } = req.body;
    const userID = req.params.id;

    // Input Validation
    const { errors, isValid } = validateUpdateInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(202).json(errors);
    };

    // Check for no inputs.
    if (email === "" && password === "") {
        errors.main = "No fields were filled out, please try again.";
        return res.status(202).json(errors);
    }

    // Check if email already exists.
    User.findOne({ email }).then(user => {
        if (user) {
            errors.email = "Invalid Field - An account with this email address already exists.";
            return res.status(202).json(errors);
        }
    }).catch(err => res.status(400).json(err));

    // Find user matching the request user ID.
    User.findById(userID).then(user => {
        // Update user information.
        if (email !== "") user.email = email;
        if (password !== "") user.password = user.generateHash(password);

        // Save user with new information.
        user.save()
            .then(res.json(user))
            .catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
});


// @route   DELETE api/users/{User ID}
// @desc    Deletes user matching the request's user ID from the database.
// @access  Public
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// @route   GET api/users/register
// @desc    Registers a user and adds the user to the database.
// @access  Public
router.post('/register', (req, res) => {
    // Create variables from request fields.
    const { username, email, password } = req.body;

    // Form validation.
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation.
    if (!isValid) {
        res.status(202).json(errors);
    }
    else {
        // Check if username already exists.
        User.findOne({ username }).then(username_test => {
            if (username_test) {
                errors.username = "Invalid Field - Username already exists.";
                res.status(202).json(errors);
            }
            else {
                // Check if email already exists.
                User.findOne({ email }).then(email_test => {
                    if (email_test) {
                        errors.email = "Invalid Field - An account with this email address already exists.";
                        res.status(202).json(errors);
                    }
                    else {
                        // Create new user.
                        const newUser = new User({
                            username: username,
                            email: email,
                            password: password,
                            // req.connection.remoteAddress gets the user's IP address.
                            last_IP: req.connection.remoteAddress
                        });

                        // Hash password before saving into the database.
                        newUser.password = newUser.generateHash(newUser.password);

                        // Save the user to the database.
                        newUser.save().then(() => {
                            User.findOne({ username }).select("-password").then(user => {
                                res.status(200).json(user);
                            }).catch(err => res.status(400).json(err));
                        });
                    }
                }).catch(err => res.status(400).json(err));
            }
        }).catch(err => res.status(400).json(err));
    }    
});


// @route   GET api/users/login
// @desc    Logs the user into the application, finds user matching information passed through request body.
// @access  Public
router.post('/login', (req, res) => {
    // Create variables from request fields.
    const { username, password } = req.body;

    // Form validation.
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation.
    if (!isValid) {
        return res.status(202).json(errors);
    };

    User.findOne({ username }).then(user => {
        // Check if username exists.
        if (!user) {
            errors.main = "Username or password is incorrect, please try again.";
            return res.status(202).json(errors);
        };

        // Validate password.
        if(!user.validatePassword(password)) {
            errors.main = "Username or password is incorrect, please try again."
            return res.status(202).json(errors);
        };

        // Generate a cookie to authorise user on login specific interactions with the application.
        jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                res.cookie('token', token, { httpOnly: true });
            }
        );

        // Update user's last IP address.
        user.last_IP = req.connection.remoteAddress;

        // Save user's new information to the database.
        user.save()
            .then(() => {
                // Return user object without password to be stored in localStorage.
                User.findOne({ username }).select('-password').then(user => {
                    res.status(200).json(user);
                }).catch(err => res.status(400).json(err));
            }).catch(err => req.status(400).json(err));      
    })
    .catch(err => res.status(400).json(err));
});


// @route   POST api/users/logout
// @desc    Logs the user out of the application through clearing the JWT token stored to authenticate the user.
// @access  Public
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.sendStatus(200);
});


// @route   POST api/users/findUserByName
// @desc    Check if the username passed through the request body exists in the database or not.
// @access  Public
router.post("/findUserByName", (req, res) => {
    // Create variables from request fields.
    const { username } = req.body;

    // Initialise errors object.
    const errors = {};

    // Fetch user matching the username passed into the route.
    User.findOne({ username }).then(user => {
        if (user) {
            // Return error if user already exists.
            errors.username = "Invalid Field - Username already exists.";
            res.status(202).json(errors);
        }
        else {
            // Return success if user doesn't exist.
            errors.username = "Success! This username is available.";
            res.status(200).json(errors);
        }
    })
    .catch(err => res.status(400).json(err));
});


// @route   POST api/users/updateReaction
// @desc    Runs if a user reacts to a post. Updates the post_reactions and reaction_count variables for relevant users.
// @access  Public
router.post("/updateReaction", (req, res) => {
    // Create variables from request fields.
    const { reaction, username, postID } = req.body;

    // Fetch user that matches the username passed into route (without password as it will be returned to localStorage).
    User.findOne({ username }).select('-password').then(user => {
        // Find post that matches the post ID passed into route and then gets the user that owns that post.
        Post.findOne({ _id: new ObjectId(postID) }).then(post => {
            User.findOne({ _id: new ObjectId(post.userID) }).then(user2 => {
                // Runs if reaction is added.
                if (reaction) {
                    if (!user.post_reactions.get(postID)) user2.reaction_count += 1;
                    user.post_reactions.set(postID, reaction);
                }
                // Runs if reaction is deleted.
                else {
                    user.post_reactions.delete(postID);
                    user2.reaction_count -= 1;
                }

                // Save both users edited with their new information.
                user.save()
                    .catch(err => res.status(400).json(err));

                user2.save()
                    .then(res.status(200).json(user))
                    .catch(err => res.status(400).json(err));
            }).catch(err => res.status(400).json(err));
        }).catch(err => res.status(400).json(err));
    }).catch(err => res.status(400).json(err));
});


// @route   GET api/users/findUsersByReactionCount
// @desc    Returns the top 10 users sorted by their reaction count.
// @access  Public
router.get("/findUsersByReactionCount", (req, res) => {
    User.find().select("username reaction_count").sort({ reaction_count: -1 }).limit(10).then(users => {
        res.status(200).json(users);
    }).catch(err => res.status(400).json(err));
});


// @route   GET api/users/findUsersByPostCount
// @desc    Returns the top 10 users sorted by their total post count.
// @access  Public
router.get("/findUsersByPostCount", (req, res) => {
    User.find().select("username post_count").sort({ post_count: -1 }).limit(10).then(users => {
        res.status(200).json(users);
    }).catch(err => res.status(400).json(err));
});


// @route   GET api/users/findSockPuppets
// @desc    Returns an array of all groups of suspected sock puppet users.
// @access  Public
router.get("/findSockPuppets", (req, res) => {
    User.aggregate([{ $match: { is_admin: false, last_IP: { $ne: null } } }])
        .group({
            "_id": "$last_IP",
            "userList": {
                "$addToSet": {
                    "username": "$username",
                    "email": "$email"
                }
            }
        })
        .project({
            "_id": 0,
            "last_IP": "$_id",
            "userList": 1
        })
        .then(userLists => {
            const listFiltered = userLists.filter(userList => userList.userList.length >= 3);
            res.status(200).json(listFiltered);
        })
        .catch(err => res.status(400).json(err));
});

module.exports = router;