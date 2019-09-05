const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check for token
    if(!token) {
        res.status(401).json({ msg: "Error: Unauthorized user..."});
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET_KEY);
    
        // Add user to request from payload
        req.user = decoded;
    next();
    } catch(e) {
        res.status(400).json({ msg: "Error: Invalid token..." })
    }
    
}

module.exports = auth;