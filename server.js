const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('config');
const cors = require('cors');
const postsRoute = require('./routes/posts');
const authRoute = require('./routes/users');
const assignmentsRoute = require('./routes/assignments');
const submissionsRoute = require('./routes/submissions');

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use(cors({
  origin: config.get('uiUrl'),
  credentials: true
}));

app.use('/users', authRoute);
app.use('/posts', postsRoute);
app.use('/assignments', assignmentsRoute);
app.use('/submissions', submissionsRoute);

const PORT = config.get('port');
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on PORT ${PORT}`);
});
