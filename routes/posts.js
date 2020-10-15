const express = require('express');
const router = express.Router();
const { auth } = require('./verifyToken');

router.get('/', auth, (req, res) => {
    res.json("HELLO");
})

module.exports = router;