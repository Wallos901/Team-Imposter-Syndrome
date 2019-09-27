const router = require('express').Router();
const auth = require("../../src/utilities/auth/authMiddleware");

let Post = require('../models/post.model');

router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add', auth).post((req, res) => {
    const content = req.body.content;
    const alt_text = req.body.alt_text;
    const user_id = req.body.user_id;
    const status_id = req.body.status_id;

    const newPost =new Post({
        content,
        alt_text,
        user_id,
        status_id
    });

    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.content = req.body.content;
            post.alt_text = req.body.alt_text;
            post.user_id = req.body.user_id;
            post.status_id = req.body.status_id;

            post.save()
                .then(() => res.json('Post updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id', auth).delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/replies", (req, res) => {
    const postID = req.query.postID;

    Post.findOne({ _id: postID }).populate("replies").then(post => {
        post
            ? res.json(post.replies)
            : res.sendStatus(400);
    }).catch(err => res.status(400).json(err));
});

module.exports = router;