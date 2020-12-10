const jwt = require('jsonwebtoken');

const isUser = (req, res, next) => {
    const token = req.cookies['session'];
    if(!token) {
        return res.status(401).send("You need to be logged in to view this page!");
    }
    return next()
}

const isTeacher = (req, res, next) => {
    const token = req.cookies['session'];
    if(!token) {
        return res.status(401).send("You need to be logged in to view/create posts!");
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if(decoded.role === 'teacher'){
            return next()
        }
        else {
            return res.status(404).json("You're not allowed to post!")
        }
    } catch(err) {
        return res.status(400).send("Invalid token");
    }
}

module.exports = {
    isTeacher,
    isUser
};