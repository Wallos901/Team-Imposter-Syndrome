
// Package imports
const router = require('express').Router();
const jwt = require("jsonwebtoken");

// Middleware imports
const auth = require("../../src/utilities/auth/authMiddleware");

// Load input validation
const validateRegisterInput = require("../../src/utilities/validation/register.util");
const validateLoginInput = require("../../src/utilities/validation/login.util");
const validateUpdateInput = require("../../src/utilities/validation/update.util");

// Load user model
const User = require('../models/user.model');

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

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

router.post('/update/:id', (req, res) => {
    // Create variables from request fields
    const { email, password } = req.body;
    const userID = req.params.id;

    // Input Validation
    const { errors, isValid } = validateUpdateInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(202).json(errors);
    };

    // Check for no inputs
    if (email === "" && password === "") {
        errors.main = "No fields were filled out, please try again.";
        return res.status(202).json(errors);
    }

    // Check if email already exists
    User.findOne({ email }).then(user => {
        if (user) {
            errors.email = "Invalid Field - An account with this email address already exists.";
            return res.status(202).json(errors);
        }
    }).catch(err => res.status(400).json(err));

    User.findById(userID).then(user => {
        if (email !== "") user.email = email;
        if (password !== "") user.password = user.generateHash(password);

        user.save()
            .then(res.json(user))
            .catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/register', (req, res) => {
    // Create variables from request fields 
    const { username, email, password } = req.body;

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    
    // Check validation
    if (!isValid) {
        return res.status(202).json(errors);
    };

    // Check if username already exists
    User.findOne({ username }).then(user => {
        if (user) {
            errors.username = "Invalid Field - Username already exists.";
            return res.status(202).json(errors);
        }
    }).catch(err => res.status(400).json(err));

    // Check if email already exists
    User.findOne({ email }).then(user => {
        if (user) {
            errors.email = "Invalid Field - An account with this email address already exists.";
            return res.status(202).json(errors);
        }
    }).catch(err => res.status(400).json(err));

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
        .then(res.sendStatus(200))
        .catch(err => res.status(400).json(err));
});

router.post('/login', (req, res) => {
    // Create variables from request fields 
    const { username, password } = req.body;

    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    
    // Check validation
    if (!isValid) {
        return res.status(202).json(errors);
    };

    User.findOne({ username }).then(user => {
        // Check if username exists
        if (!user) {
            errors.main = "Username or password is incorrect, please try again.";
            return res.status(202).json(errors);
        };

        // Validate password
        if(!user.validatePassword(password)) {
            errors.main = "Username or password is incorrect, please try again."
            return res.status(202).json(errors);
        };

        jwt.sign(
            { id: user._id },
            process.env.REACT_APP_JWT_SECRET_KEY,
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                res.cookie('token', token, { httpOnly: true });
            }
        );

        User.findOne({ username }).select('-password').then(user => {
            res.status(200).json(user);
        }).catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
});

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.sendStatus(200);
});

router.post("/findUserByName", (req, res) => {
    const { username } = req.body;
    const errors = {};
    User.findOne({ username }).then(user => {
        if (user) {
            errors.username = "Invalid Field - Username already exists.";
            res.status(202).json(errors);
        }
        else {
            errors.username = "Success! This username is available.";
            res.status(200).json(errors);
        }
    })
    .catch(err => res.status(400).json(err));
});

router.post("/updateReaction", (req, res) => {
    const { reaction, username, postID } = req.body;
    User.findOne({ username }).select('-password').then(user => {
        reaction
            ? user.post_reactions.set(postID, reaction)
            : user.post_reactions.delete(postID);
        user.save()
            .then(res.status(200).json(user))
            .catch(err => res.status(400).json(err));
    }).catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
});

module.exports = router;