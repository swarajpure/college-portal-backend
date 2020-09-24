const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, 
{ useNewUrlParser: true,  useUnifiedTopology: true},
() => {
    console.log('DB CONNECTED');
})

app.use(express.json());

app.use('/api/users', authRoute);

app.listen(3000, () => {
    console.log("server running");
})