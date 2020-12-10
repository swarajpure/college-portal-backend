const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');


router.get('/', authenticate.isUser, (req, res) => {
    res.json("LOGGED IN")
})

router.post('/create', authenticate.isTeacher, (req, res) => {
    res.json("HELLO");
})

module.exports = router;