const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const userQuery = require('../models/users');
const validation = require('../middlewares/validators/userValidator');

const getUsers = async (req, res) => {
  try {
    const allUsers = await userQuery.fetchUsers();
    return res.json(allUsers);
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const signOut = (req, res) => {
  res.clearCookie('session');
  res.json('Signed out successfully!');
};

const getSelfDetails = (req, res) => res.send(req.userData);

const login = async (req, res) => {
  try {
    const { error } = validation.loginValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const userDetails = await userQuery.findUser(req.body.email);
    if (userDetails) {
      const validPass = await bcrypt.compare(req.body.password, userDetails.password);
      if (!validPass) {
        return res.status(400).json({ message: 'Wrong Password' });
      }

      const token = jwt.sign({
        id: userDetails.id,
        role: userDetails.role,
        name: userDetails.name
      }, config.get('tokenSecret'));
      return res.cookie('session', token, {
        domain: 'localhost',
        expires: new Date(Date.now() + 9999999999)
      }).json({ message: 'Login Successful!' });
    }

    return res.status(404).json({ message: 'User not found!' });
  } catch (err) {
    return res.json({ message: `Error: ${err}` });
  }
};

const register = async (req, res) => {
  const { error } = validation.registerValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const userFromEmail = await userQuery.emailExists(req.body.email);
  if (userFromEmail) {
    return res.status(500).json({ message: 'Email already exists!' });
  }

  const userFromName = await userQuery.nameExists(req.body.name);
  if (userFromName) {
    return res.status(500).json({ message: 'Name already taken!' });
  }

  // Hash password
  const hash = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, hash);

  const user = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: hashPassword
  };
  try {
    await userQuery.addUser(user);
    return res.status(200).json({ message: 'Registration successful!' });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports = {
  getUsers,
  getSelfDetails,
  login,
  register,
  signOut
};
