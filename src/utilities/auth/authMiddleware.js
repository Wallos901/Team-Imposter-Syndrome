const jwt = require('jsonwebtoken');

function auth(req, res, next) {
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

module.exports = auth;