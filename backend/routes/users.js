
// Package imports
const router = require('express').Router();
const jwt = require("jsonwebtoken");

// Middleware imports
const auth = require("../../src/utilities/auth/authMiddleware");

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

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.username = req.body.username;
            user.password = req.body.password;
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
    // Create variables from request fields 
    const { username, email, password } = req.body;

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Check if username already exists
    User.findOne({ username }).then(user => {
        if (user) {
            return res.status(400).json({ msg: "Username already exists..." });
        }

        // Create new user
        const newUser = new User({
            username: username,
            email: email,
            password: password
        });

        // Hash password before saving into the database
        newUser.password = newUser.generateHash(newUser.password);

        // Save the user to the database
        newUser.save()
            .then(user =>
                jwt.sign(
                    { id: user._id },
                    process.env.REACT_APP_JWT_SECRET_KEY,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user._id,
                                username: user.username,
                                email: user.email
                            }
                        })
                    }
                )
            )
            .catch(err => console.log(err));
        
    });
});

router.route('/login').post((req, res) => {
    // Create variables from request fields 
    const { username, password } = req.body;

    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ username: username }).then(user => {
        // Check if username exists
        if (!user) {
            return res.status(400).json({ msg: "Username doesn't exist..." });
        }

        // Validate password
        if(!user.validatePassword(password)) {
            return res.status(400).json({ msg: "Password is incorrect..." });
        }

        jwt.sign(
            { id: user._id },
            process.env.REACT_APP_JWT_SECRET_KEY,
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                res.json({
                    token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                })
            }
        )
    });
})

router.route("authUser", auth).get((req, res) => {
    User.findById(req.user._id)
        .select("-password")
        .then(user => res.json(user));
});

module.exports = router;