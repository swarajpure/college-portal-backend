const express = require('express');
const app = express();
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(cors());

dotenv.config();

app.use(express.json());

app.use('/users', authRoute);
app.use('/posts', postsRoute);

app.listen(3000, () => {
    console.log("server running");
})