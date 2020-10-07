const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { post } = require('./routes/posts');
const cors = require('cors');

app.use(cors());

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, 
{ useNewUrlParser: true,  useUnifiedTopology: true},
() => {
    console.log('DB CONNECTED');
})

app.use(express.json());

app.use('/users', authRoute);
app.use('/posts', postsRoute);

app.listen(3000, () => {
    console.log("server running");
})