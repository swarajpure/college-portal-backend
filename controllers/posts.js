const postQuery = require('../models/posts');
const { postValidation } = require('../middlewares/validators/postValidator');

const getPosts = async (req, res) => {
    try {
        const allPosts = await postQuery.fetchPosts();
        console.log(allPosts);
        return res.json(allPosts);
    }catch(err){
        return res.status(500).json(err);
    }
}

const createPost = async (req, res) => {
    const { error } = postValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const post = {
            author: req.body.author,
            content: req.body.content,
            date: Date.now()
        }
        await postQuery.addPost(post);
        console.log(post);
        return res.json('Post created successfully!:' + post);
    }
    catch (err){
        return res.status(502).json(err);
    }
}

module.exports = {
    getPosts,
    createPost
}