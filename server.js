const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/users');
const assignmentsRoute = require('./routes/assignments');
const submissionsRoute = require('./routes/submissions');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

dotenv.config();

app.use(cookieParser());

app.use(express.json());

app.use('/users', authRoute);
app.use('/posts', postsRoute);
app.use('/assignments', assignmentsRoute);
app.use('/submissions', submissionsRoute);

const PORT = 4000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on PORT ${PORT}`);
});
