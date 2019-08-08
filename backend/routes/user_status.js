const router = require('express').Router();
let User_Status = require('../models/user_status.model');

router.route('/').get((req, res) => {
    User_Status.find()
        .then(user_status => res.json(user_status))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User_Status.findById(req.params.id)
        .then(user_status => res.json(user_status))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;

    const newUser_Status =new User_Status({
        name
    });

    newUser_Status.save()
        .then(() => res.json('User_Status added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    User_Status.findById(req.params.id)
        .then(user_status => {
            user_status.name = req.body.name;

            user_status.save()
                .then(() => res.json('User_Status updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User_Status.findByIdAndDelete(req.params.id)
        .then(() => res.json('User_Status deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;