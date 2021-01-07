const postQuery = require('../models/posts');
const { postValidation } = require('../middlewares/validators/postValidator');

const getPosts = async (req, res) => {
  try {
    const allPosts = await postQuery.fetchPosts();
    return res.json(allPosts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const createPost = async (req, res) => {
  const { error } = postValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const d = Date.now();
    const date = new Date(d);
    const dateString = date.toDateString();
    const post = {
      author: req.body.author,
      content: req.body.content,
      date: dateString
    };
    await postQuery.addPost(post);
    return res.json({ message: 'Post created successfully!' });
  } catch (err) {
    return res.status(502).json(err);
  }
};

module.exports = {
  getPosts,
  createPost
};
