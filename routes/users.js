const express = require('express');

const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const userController = require('../controllers/users');

router.get('/', authenticate.isUser, userController.getUsers);

router.get('/self', authenticate.isUser, userController.getSelfDetails);

router.get('/signout', userController.signOut);

router.post('/login', userController.login);

router.post('/register', userController.register);

module.exports = router;
