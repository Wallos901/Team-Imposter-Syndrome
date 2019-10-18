
/*
    Definition of all routes using the Comment Model.
    Unused, kept as legacy. Might be needed in future by other developers.
*/

// Package Imports
const router = require('express').Router();

// Load Comment Model
let Comment = require('../models/comment.model');

// @route   GET api/comments
// @desc    Return an array of all comments stored in the database.
// @access  Public
router.route('/').get((req, res) => {
    Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   GET api/comments/{Post ID}
// @desc    Return the comment matching the Post ID passed in.
// @access  Public
router.route('/:id').get((req, res) => {
    Comment.findById(req.params.id)
        .then(comment => res.json(comment))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   POST api/comments/add
// @desc    Add comment to the database based on request body
// @access  Public
router.route('/add').post((req, res) => {
    const content = req.body.content;
    const user_id = req.body.user_id;
    const post_id = req.body.post_id;
    const status_id = req.body.status_id;

    const newComment =new Comment({
        content,
        user_id,
        post_id,
        status_id
    });

    newComment.save()
        .then(() => res.json('Comment added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   POST api/comments/update/{Post ID}
// @desc    Update comment matching Post ID passed in with information gained through request body.
// @access  Public
router.route('/update/:id').post((req, res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            comment.content = req.body.content;
            comment.user_id = req.body.user_id;
            comment.post_id = req.body.post_id;
            comment.status_id = req.body.status_id;

            comment.save()
                .then(() => res.json('Comment updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   DELETE api/comments/{Post ID}
// @desc    Delete comment matching Post ID passed in from the database.
// @access  Public
router.route('/:id').delete((req, res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Comment deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;