const router = require('express').Router();
let Comment = require('../models/comment.model');

router.route('/').get((req, res) => {
    Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Comment.findById(req.params.id)
        .then(comment => res.json(comment))
        .catch(err => res.status(400).json('Error: ' + err));
});

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

router.route('/:id').delete((req, res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.json('Comment deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;