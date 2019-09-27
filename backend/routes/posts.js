const router = require('express').Router();
const auth = require("../../src/utilities/auth/authMiddleware");

const ObjectId = reqire("mongoose").Schema.Types.ObjectId;

let Post = require('../models/post.model');

router.get("/", (req, res) => {
    Post.find({ replyTo: null })
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/:id", (req, res) => {
    Post.find({ _id: ObjectId(req.params.id) })
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/add", auth, (req, res) => {
    const newPost = new Post(req.body);

    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/update/:id", (req, res) => {
    Post.find({ _id: ObjectId(req.params.id) }).then(post => {
        Object.assign(post, req.body);

        post.save()
            .then(() => res.json('Post updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
});

router.delete("/:id", auth, (req, res) => {
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