const { db } = require('../firestore');
const postModel = db.collection('posts');

const getPosts = async () => {
    try {
        const snapshot = await postModel.get();
        // console.log(snapshot)
        const allPosts = [];
        snapshot.forEach((doc) => {
            allPosts.push(doc.data())
        });
        return allPosts;
    } catch(err){
        console.log("Could not fetch posts!");
        throw err;
    }
}