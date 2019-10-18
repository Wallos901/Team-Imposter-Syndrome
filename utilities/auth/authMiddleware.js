
/*
    Code inspired from https://www.youtube.com/watch?v=USaB1adUHM0&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=9
    Middleware implementation of token checking to authenticate the user on backend API calls.
*/

// Package Imports
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    // Get the token from the request cookies.
    const token = req.cookies.token;

    // Check for token
    if(!token) {
        res.status(401).send("Error: Unauthorized user...");
    }

    try {
        // Verify token
        jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY);
        next();
    } catch(e) {
        res.status(400).json({ msg: "Error: Invalid token..." })
    }
}

// Export the auth function so it can be used by backend API routes.
module.exports = auth;