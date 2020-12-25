const userQuery = require('../models/users')
const validation = require('../middlewares/validators/userValidator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
    try {
        const allUsers = await userQuery.fetchUsers()
        console.log(allUsers)
        return res.json(allUsers)
    }catch(err){
        return res.status(500).json(err);
    }
}

const getSelfDetails = (req, res) => {
    res.send(req.userData)
}

const login = async (req,res) => {
    try {
        const { error } = validation.loginValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userDetails = await userQuery.findUser(req.body.email);
        if(userDetails){
            const validPass = await bcrypt.compare(req.body.password, userDetails.password);
            if (!validPass) {
                return res.status(400).send("Wrong Password");
            }

            const token = jwt.sign({ id: userDetails.id, role: userDetails.role, name: userDetails.name}, process.env.TOKEN_SECRET);
            return res.cookie('session', token, {
                domain: 'localhost',
                expires: new Date(Date.now() + 9999999999)
            }).json({ message: 'Login Successful!'} );
        }
        else {
            res.status(404).json("User not found!")
        }
    } catch (err){
            return res.json(`Error: ${err}`)
        }
}

const register = async (req, res) => {
    const { error } = validation.registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const userFromEmail = await userQuery.emailExists(req.body.email);
    if(userFromEmail){
        return res.status(500).json("Email already exists!")
    }

    const userFromName = await userQuery.nameExists(req.body.name);
    if(userFromName){
        return res.status(500).json("Name already taken!")
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
        await userQuery.addUser(user);
        return res.status(200).json(`${user.name} registered successfully!`);
    }
    catch(err) {
        return res.status(500).json(err);
    }
}

module.exports = {
    getUsers,
    getSelfDetails,
    login,
    register
}