const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const { loginValidation, registerValidation } = require('../validation');


router.post('/login', async (req,res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email});
    if (!user){ 
        return res.status(400).send("User not found");
    };

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
        return res.status(400).send("Wrong Password");
    }

    return res.status(200).send("User found!");
    
})

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const emailExists = await User.findOne({ email: req.body.email});
    if (emailExists){ 
        return res.status(400).send("Email already exists");
    };

    const nameExists = await User.findOne({ name: req.body.name});
    if (nameExists) { 
        return res.status(400).send("Name already exists");
    };

    // Hash password
    const hash = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, hash);

    const user = new User( {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser._id);
    }
    catch(err) {
        res.status(400).send(err);   
    }
})

module.exports = router;