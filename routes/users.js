const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginValidation, registerValidation } = require('../middlewares/validators/userValidator');
const { db } = require('../firestore')
const userModel = db.collection('users')
const userQuery = require('../models/users')
const authenticate = require('../middlewares/authenticate')
const userController = require('../controllers/users')

router.get('/', authenticate.isUser, userController.getUsers)

router.post('/login', userController.login)

router.post('/register', )

module.exports = router;