const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    try {
        const { error } = loginValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userExists = await userModel.where('email', '==', req.body.email).limit(1).get()
        if (userExists.empty){
            return res.status(400).send("User not found");
        }

        let userDetails;
        userExists.forEach(doc => {
            userDetails = doc.data();
        })
        console.log(userDetails)

        const validPass = await bcrypt.compare(req.body.password, userDetails.password);
        if (!validPass) {
            return res.status(400).send("Wrong Password");
        }

        const token = jwt.sign({ id: userDetails.id, role: userDetails.role}, process.env.TOKEN_SECRET);
        return res.cookie('session', token, {
            domain: 'localhost',
            expires: new Date(Date.now() + 9999999999)
        }).json({ message: 'Login Successful!'} );
        } catch (err){
            return res.json(`Error: ${err}`)
        }

})

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const emailExists = await userModel.where('email', '==', req.body.email).limit(1).get()
    if (!emailExists.empty){
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
        return res.status(200).json(`${user.name} registered successfully!`);
    }
    catch(err) {
        return res.status(500).json(err);
    }
})

module.exports = router;