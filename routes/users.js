const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate')
const userController = require('../controllers/users')

router.get('/', authenticate.isUser, userController.getUsers)

router.post('/login', userController.login)

router.post('/register', userController.register)

module.exports = router;