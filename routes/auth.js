const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { loginValidation, registerValidation } = require('../validation');
const { db } = require('../firestore')
const userModel = db.collection('users')

router.get('/', async (req, res) => {
    try {
        const snapshot = await userModel.get();
        const allUsers = []
        snapshot.forEach((doc) => {
            allUsers.push(doc.data())
        });
        return res.json(allUsers)
    }catch(err){
        return res.send(err);
    }
})

router.post('/login', async (req,res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email});
    if (!user){
        return res.status(400).send("User not found");
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send("Wrong Password");
    }

    const token = jwt.sign({ _id: user._id, role: user.role}, process.env.TOKEN_SECRET);
    return res.cookie('session', token).json({ message: 'Login Successful!'} );
})

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const emailExists = await userModel.where('email', '==', req.body.email).limit(1).get()
    console.log(emailExists.data)
    if (!emailExists.empty){
        console.log(emailExists.data)
        return res.status(400).json("Email already exists");
    }

    const nameExists = await userModel.where('name', '==', req.body.name).limit(1).get()
    if (!nameExists.empty) {
        return res.status(400).json("Name already exists");
    }

    // Hash password
    const hash = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, hash);

    const user = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: hashPassword
    }
    try {
        const savedUser = await userModel.add(user)
        return res.status(200).json("User registered successfully! " + savedUser.id);
    }
    catch(err) {
        return res.status(500).json(err);
    }
})

module.exports = router;