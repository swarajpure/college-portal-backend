const { db } = require('../firestore');
const postModel = db.collection('posts');

const fetchPosts = async () => {
    try {
        const snapshot = await postModel.get();
        const allPosts = [];
        snapshot.forEach((doc) => {
            allPosts.push(doc.data());
        });
        return allPosts;
    } catch(err){
        return err;
    }
}

const addPost = async (data) => {
    const savedPost = await postModel.add(data);
    return savedPost;
}

module.exports = {
    fetchPosts,
    addPost
}