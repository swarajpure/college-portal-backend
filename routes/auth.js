const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { loginValidation, registerValidation } = require('../validation');


router.post('/login', async (req,res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    
})

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const emailExists = await User.findOne({ email: req.body.email});
    if (emailExists){ 
        res.status(400).send("Email already exists");
        return;
    };

    const nameExists = await User.findOne({ name: req.body.name});
    if (nameExists) { 
        res.status(400).send("Name already exists");
        return;
};

    const user = new User( {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch(err) {
        res.status(400).send(err);   
    }
})

module.exports = router;