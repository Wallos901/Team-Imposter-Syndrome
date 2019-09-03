
// Package imports
const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load input validation
const validateRegisterInput = require("../../src/utilities/validation/register.util");
const validateLoginInput = require("../../src/utilities/validation/login.util");

// Load user model
const User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const hashed_password = req.body.hashed_password;
    const email = req.body.email;
    const last_activity = Date.parse(req.body.last_activity);
    const is_moderator = req.body.is_moderator;
    const is_admin = req.body.is_admin;
    const status = req.body.status;
    const user_status_id = req.body.user_status_id;
    
    const newUser = new User({
        username,
        hashed_password,
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

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.hashed_password = req.body.hashed_password;
            user.email = req.body.email;
            user.last_activity = Date.parse(req.body.last_activity);
            user.is_moderator = req.body.is_moderator;
            user.is_admin = req.body.is_admin;
            user.status = req.body.status;
            user.user_status_is = req.body.user_status_id;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check if user email already exists
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } 
        else {
            // Create new user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before saving into the database
            newUser.password = newUser.generateHash(newUser.password);

            // Save the user to the database
            newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
        }
    });
})

module.exports = router;