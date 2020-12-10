const express = require('express');
const app = express();
const authRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());


dotenv.config();

app.use(express.json());

app.use('/users', authRoute);
app.use('/posts', postsRoute);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})