const router = require('express').Router();
let User = require('../models/user.model');

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
    const created_at = Date.parse(req.body.created_at);
    const last_activity = Date.parse(req.body.last_activity);
    const is_moderator = req.body.is_moderator;
    const is_admin = req.body.is_admin;
    const status = req.body.status;
    const user_status_id = req.body.user_status_id;

    const newUser =new User({
        username,
        hashed_password,
        email,
        created_at,
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
            user.created_at = Date.parse(req.body.created_at);
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

module.exports = router;