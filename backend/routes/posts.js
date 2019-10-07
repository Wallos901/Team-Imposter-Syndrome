const router = require('express').Router();
const auth = require("../../utilities/auth/authMiddleware");

const ObjectId = require("mongoose").Types.ObjectId;

let Post = require('../models/post.model');
let User = require("../models/user.model");

router.get("/", (req, res) => {
    Post.find({ replyTo: null, "reports.4": { $exists: false } }).then(posts => {
        res.json(posts);
    }).catch(err => res.status(400).json('Error: ' + err));
});

router.get("/sort/:filter", (req, res) => {
    const limit = (req.query && req.query.limit) ? parseInt(req.query.limit) : 10;
    const skip = (req.query && req.query.skip) ? parseInt(req.query.skip) : 0;
    const { filter } = req.params;
    if (filter === "Most Popular") {
        Post.find({ replyTo: null, "reports.4": { $exists: false } }).limit(limit).skip(skip)
        .then(posts => {
            posts.sort((a, b) => {
                return Object.values(b.reactions.toJSON()).reduce((c, d) => c + d) - Object.values(a.reactions.toJSON()).reduce((c, d) => c + d)
            });
            res.json(posts);
        }).catch(err => res.status(400).json('Error: ' + err));
    } else if (filter === "Latest") {
        Post.find({ replyTo: null, "reports.4": { $exists: false } }).sort({ createdAt: -1 }).limit(limit).skip(skip)
            .then(posts => {
                res.json(posts);
            }).catch(err => res.status(400).json(err));
    } else {
        Post.find({ replyTo: null, category: filter, "reports.4": { $exists: false } }).limit(limit).skip(skip)
        .then(posts => {
            res.json(posts);
        }).catch(err => res.status(400).json(err));
    }
});

router.get("/reportedPosts", (req, res) => {
    Post.find().then(posts => {
        const postList = posts.filter(post => post.reports.length >= 5);
        res.json(postList);
    }).catch(err => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
    Post.find({ _id: ObjectId(req.params.id) })
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/add", (req, res) => {
    const newPost = new Post(req.body);

    User.findOne({ _id: new ObjectId(req.body.userID) }).then(user => {
        user.post_count += 1;
        user.save()
            .catch(err => res.status(400).json(err));
    }).catch(err => res.status(400).json(err));

    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/update/:id", (req, res) => {
    Post.find({ _id: ObjectId(req.params.id) }).then(post => {
        Object.assign(post, req.body);

        post.increment();

        post.save()
            .then(() => res.json('Post updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
});

router.delete("/:id", (req, res) => {
    const postID = req.params.id;
    let errors = {};
    Post.findById(postID).then(post => {
        Post.find({ replyTo: new ObjectId(postID) }).then(posts => {
            if (posts.length > 0) {
                post.imageURL = "https://discussion-board.s3-ap-southeast-2.amazonaws.com/photos/placeholder.png";
                post.deleted = true;
                post.reports = [];
                errors.error = "This post has replies, it will be replaced with a placeholder image."
                post.save()
                    .then(() => res.status(202).json(errors))
                    .catch(err => {
                        console.log(err);
                        res.status(400).json(err);
                    });
            } else {
                post.remove()
                    .then(post => res.status(200).json(post))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        }).catch(err => res.status(400).json(err));
    }).catch(err => res.status(400).json(err));
    
});

router.post("/editCheck/:id", (req, res) => {
    const postID = req.params.id;
    let errors = {};
    Post.findById(postID).then(post => {
        Post.find({ replyTo: new ObjectId(postID) }).then(posts => {
            if (posts.length > 0 || Object.values(post.reactions.toJSON()).reduce((a, b) => a + b) !== 0) {
                errors.error = "This post has reactions and/or replies, it cannot be changed.";
                res.status(202).json(errors);
            } else {
                res.sendStatus(200);
            }
        }).catch(err => res.status(400).json(err));
    }).catch(err => res.status(400).json(err));
});

router.get("/replies/:postID", (req, res) => {
    const postID = req.params.postID;

    Post.find({ replyTo: postID }).populate({ path: "user", select: "username -_id" }).then(replies => {
        // Object.keys(post.replies).forEach(reply => {
        //     reply.populate({ path: "user", select: "username -_id" });
        // });
        replies
            ? res.json(replies)
            : res.sendStatus(400);
    }).catch(err => res.status(400).json(err));
});

router.post("/getReactions", (req, res) => {
    const { postID } = req.body;
    Post.findOne({ _id: new ObjectId(postID) }).then(post => {
        res.status(200).json(post.reactions);
    }).catch(err => res.status(400).json(err));
});

router.post("/updateReaction", (req, res) => {
    const { postID, prevReact, currReact } = req.body;
    Post.findOne({ _id: new ObjectId(postID) }).then(post => {
        if (prevReact === currReact) post.reactions.set(currReact, post.reactions.get(currReact) - 1);
        else if (!prevReact) post.reactions.set(currReact, post.reactions.get(currReact) + 1);
        else {
            post.reactions.set(prevReact, post.reactions.get(prevReact) - 1);
            post.reactions.set(currReact, post.reactions.get(currReact) + 1);
        }
        post.save()
            .then(() => res.sendStatus(200))
            .catch(err => res.status(400).json(err));
    }).catch(err => res.status(400).json(err));
});

router.get("/byUser/:id", (req, res) => {
    const userID = req.params.id;
    Post.find({ userID, replyTo: null, "reports.4": { $exists: false } }).then(posts => {
        res.json(posts);
    }).catch(err => res.status(400).json(err));
});

router.post("/reportPost", (req, res) => {
    const { postID, userID } = req.body;
    Post.findOne({ _id: new ObjectId(postID) }).then(post => {
        console.log("here");
        post.reports.push(userID);
        console.log(post);
        post.save()
            .then(() => res.sendStatus(200))
            .catch(err => res.status(400).json(err));
    }).catch(err => res.status(400).json(err));
});

router.get("/hasUserReportedPost/:userID/:postID", (req, res) => {
    const { userID, postID } = req.params;
    Post.findById(postID).then(post => {
        res.status(200).json(post.reports.includes(userID));
    }).catch(err => res.status(400).json(err));
});

module.exports = router;