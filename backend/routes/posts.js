
/*
    Definitions of all routes using the Post Model
*/

// Package Imports
const router = require('express').Router();

// Middleware Imports
// const auth = require("../../utilities/auth/authMiddleware");

// Load ObjectId Type
const ObjectId = require("mongoose").Types.ObjectId;

// Load Post Model
let Post = require('../models/post.model');

// Load User Model
let User = require("../models/user.model");


// @route   GET api/posts
// @desc    Return an array of all posts stored in the database where replyTo is null and reports count is less than 5.
// @access  Public
router.get("/", (req, res) => {
    Post.find({ replyTo: null, "reports.4": { $exists: false } }).then(posts => {
        res.json(posts);
    }).catch(err => res.status(400).json('Error: ' + err));
});


// @route   GET api/posts/sort/{Filter}
// @desc    Returns an array of valid posts (replyTo is null and report count is less than 5) sorted based on the filter passed in through request parameter.
// @access  Public
router.get("/sort/:filter", (req, res) => {
    // Determine limit and skip variables from request query.
    const limit = (req.query && req.query.limit) ? parseInt(req.query.limit) : 10;
    const skip = (req.query && req.query.skip) ? parseInt(req.query.skip) : 0;

    // Create variables from request parameters.
    const { filter } = req.params;

    // Runs if the filter is Most Popular (default).
    if (filter === "Most Popular") {
        Post.find({ replyTo: null, "reports.4": { $exists: false } }).limit(limit).skip(skip)
        .then(posts => {
            posts.sort((a, b) => {
                // Sorts based on the count of reactions. i.e. most reactions first.
                return Object.values(b.reactions.toJSON()).reduce((c, d) => c + d) - Object.values(a.reactions.toJSON()).reduce((c, d) => c + d)
            });
            res.json(posts);
        }).catch(err => res.status(400).json('Error: ' + err));

    // Runs if the filter is Latest.
    } else if (filter === "Latest") {
        // Orders returned posts by their createdAt attribute. -1 means descending.
        Post.find({ replyTo: null, "reports.4": { $exists: false } }).sort({ createdAt: -1 }).limit(limit).skip(skip)
            .then(posts => {
                res.json(posts);
            }).catch(err => res.status(400).json(err));

    // Runs if the filter is a category.
    } else {
        // Matches returned posts to a specific category.
        Post.find({ replyTo: null, category: filter, "reports.4": { $exists: false } }).limit(limit).skip(skip)
        .then(posts => {
            res.json(posts);
        }).catch(err => res.status(400).json(err));
    }
});


// @route   GET api/posts/reportedPosts
// @desc    Returns all posts where the reported array contains 5 or more entries.
// @access  Public
router.get("/reportedPosts", (req, res) => {
    Post.find({ "reports.4": { $exists: true } }).then(posts => {
        res.json(posts);
    }).catch(err => res.status(400).json(err));
});


// @route   GET api/posts/{Post ID}
// @desc    Return the post that matches the post ID passed into the route.
// @access  Public
router.get("/:id", (req, res) => {
    Post.find({ _id: ObjectId(req.params.id) })
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err));
});


// @route   POST api/posts/add
// @desc    Adds a new post to the database with the values passed in through the request body.
// @access  Public
router.post("/add", (req, res) => {
    // Create new Post object based on request body.
    const newPost = new Post(req.body);

    // Find user that owns the post.
    User.findOne({ _id: new ObjectId(req.body.userID) }).then(user => {
        // Update user's post count and save user's new information to the database.
        user.post_count += 1;
        user.save()
            .catch(err => res.status(400).json(err));
    }).catch(err => res.status(400).json(err));

    // Save post to the database.
    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


// @route   POST api/posts/update/{Post ID}
// @desc    Update post matching post ID passed through request parameter with information passed through request body.
// @access  Public
router.post("/update/:id", (req, res) => {
    // Find post that matched request parameter.
    Post.find({ _id: ObjectId(req.params.id) }).then(post => {
        // Update post with new information gained through request body.
        Object.assign(post, req.body);

        // Increment version of the post to ensure continuity.
        post.increment();

        // Save post with new information into the database.
        post.save()
            .then(() => res.json('Post updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }).catch(err => res.status(400).json('Error: ' + err));
});


// @route   DELETE api/posts/{Post ID}
// @desc    Deletes a post from the database by either removing it entirely or replacing it with a placeholder image.
// @access  Public
router.delete("/:id", (req, res) => {
    // Create variables based on request parameters.
    const postID = req.params.id;

    // Initialise errors object.
    let errors = {};

    // Find post matching post ID passed in through request parameters.
    Post.findById(postID).then(post => {
        // Find any posts that are replies to the post found above.
        Post.find({ replyTo: new ObjectId(postID) }).then(posts => {
            // If post has replies, replace post with placeholder image and mark it as deleted.
            if (posts.length > 0) {
                post.imageURL = "https://discussion-board.s3-ap-southeast-2.amazonaws.com/photos/placeholder.png";
                post.deleted = true;
                post.reports = [];

                // Error to return.
                errors.error = "This post has replies, it will be replaced with a placeholder image."

                // Save post with new information to the database. Return errors to front end.
                post.save()
                    .then(() => res.status(202).json(errors))
                    .catch(err => res.status(400).json(err));
            }
            // Otherwise, remove the post entirely.
            else {
                post.remove()
                    .then(post => res.status(200).json(post))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        }).catch(err => res.status(400).json(err));
    }).catch(err => res.status(400).json(err));
    
});


// @route   POST api/posts/editCheck/{Post ID}
// @desc    Returns whether the post matching the post ID passed in can be edited according to a set of rules.
// @access  Public
router.post("/editCheck/:id", (req, res) => {
    // Create variables based on request parameters.
    const postID = req.params.id;

    // Initialise errors object.
    let errors = {};

    // Find post matching post ID passed in through request parameters.
    Post.findById(postID).then(post => {
        // Find any posts that are replies to the post found above.
        Post.find({ replyTo: new ObjectId(postID) }).then(posts => {
            // Runs if post is not able to be edited because it has replies or has reactions.
            if (posts.length > 0 || Object.values(post.reactions.toJSON()).reduce((a, b) => a + b) !== 0) {
                errors.error = "This post has reactions and/or replies, it cannot be changed.";
                res.status(202).json(errors);
            }
            // Otherwise, post can be edited.
            else {
                res.sendStatus(200);
            }
        }).catch(err => res.status(400).json(err));
    }).catch(err => res.status(400).json(err));
});


// @route   GET api/posts/replies/{Post ID}
// @desc    Returns an array of a certain number of replies to a post matching the post ID passed in through the request parameter.
// @access  Public
router.get("/replies/:postID", (req, res) => {
    // Determine limit and skip variables from request query.
    const skip = (req.query && req.query.skip) ? parseInt(req.query.skip) : 0;
    const limit = (req.query && req.query.limit) ? parseInt(req.query.limit) : 5;

    // Create variables from request parameters.
    const postID = req.params.postID;

    // Find replies to post.
    Post.find({ replyTo: postID }).populate({ path: "user", select: "username -_id" }).limit(limit).skip(skip).then(replies => {
        replies
            // If there are replies, return those replies.
            ? res.json(replies)
            // If not, return an error.
            : res.sendStatus(400);
    }).catch(err => res.status(400).json(err));
});


// @route   POST api/posts/getReactions
// @desc    Return the reaction counts of all reactions to a post passed in through the request body.
// @access  Public
router.post("/getReactions", (req, res) => {
    // Create variables from request body.
    const { postID } = req.body;

    // Find post matching post ID passed into route.
    Post.findOne({ _id: new ObjectId(postID) }).then(post => {
        // Return post reaction counts.
        res.status(200).json(post.reactions);
    }).catch(err => res.status(400).json(err));
});


// @route   GET api/posts/updateReaction
// @desc    Update the reaction counts for a post specified through the request body.
// @access  Public
router.post("/updateReaction", (req, res) => {
    // Create variables from request body.
    const { postID, prevReact, currReact } = req.body;

    // Find post matching post ID passed into route.
    Post.findOne({ _id: new ObjectId(postID) }).then(post => {
        if (prevReact) {
            // Minus 1 from previous reaction's count.
            post.reactions.set(prevReact, post.reactions.get(prevReact) - 1);
        }
        if (currReact) {
            // Add 1 to current reaction's count.
            post.reactions.set(currReact, post.reactions.get(currReact) + 1);
        }
        // Save post with new information to the database.
        post.save()
            .then(() => res.sendStatus(200))
            .catch(err => res.status(400).json(err));
    }).catch(err => res.status(400).json(err));
});


// @route   GET api/posts/byUser/{User ID}
// @desc    Returns an array of all valid posts filtered by User ID passed in through request parameters.
// @access  Public
router.get("/byUser/:id", (req, res) => {
    // Create variables from request parameters.
    const userID = req.params.id;

    // Find all valid posts based on user ID.
    Post.find({ userID, replyTo: null, "reports.4": { $exists: false } }).then(posts => {
        // Return all posts found.
        res.json(posts);
    }).catch(err => res.status(400).json(err));
});


// @route   POST api/posts/reportPost
// @desc    Allows a user specified to report a post specified through the request body.
// @access  Public
router.post("/reportPost", (req, res) => {
    // Create variables from request body.
    const { postID, userID } = req.body;

    // Find post matching post ID from request body.
    Post.findOne({ _id: new ObjectId(postID) }).then(post => {
        // Add user's ID to the post's reports array.
        post.reports.push(userID);

        // Save post with new information to the databse.
        post.save()
            .then(() => res.sendStatus(200))
            .catch(err => res.status(400).json(err));
    }).catch(err => res.status(400).json(err));
});


// @route   GET api/posts/hasUserReportedPost/{User ID}/{Post ID}
// @desc    Checks whether a specified user has reported a specified post.
// @access  Public
router.get("/hasUserReportedPost/:userID/:postID", (req, res) => {
    // Create variables from request parameters.
    const { userID, postID } = req.params;

    // Find post matching post ID from request parameters.
    Post.findById(postID).then(post => {
        // Return true or false depending on if the post's reports array contains the user ID from request parameters.
        res.status(200).json(post.reports.includes(userID));
    }).catch(err => res.status(400).json(err));
});

module.exports = router;