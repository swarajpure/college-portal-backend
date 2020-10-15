const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookie('session');
    if(!token) {
        return res.status(401).send("Access denied");
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = verified;
        next();
    } catch(err) {
        res.status(400).send("Invalid token");
    }
}

module.exports = { auth };