const { db } = require('../firestore');
const userModel = db.collection('users');

const fetchUsers = async () => {
    try {
        const snapshot = await userModel.get();
        // console.log(snapshot)
        const allUsers = [];
        snapshot.forEach((doc) => {
            allUsers.push(doc.data())
        });
        return allUsers;
    } catch(err){
        console.log("Could not fetch users!");
        throw err;
    }
}

const userExists = async (key) => {
    const userExists = await userModel.where(`${key}`, '==', key).limit(1).get()
    if (userExists.empty){
        return false;
    }
    return true;
}

const findUser = async (email) => {
    const userExists = await userModel.where('email', '==', email).limit(1).get()
    if (userExists.empty){
        return null;
    }

    let userDetails;
    userExists.forEach(doc => {
        userDetails = doc.data();
    });

    return userDetails;
}

const addUser = async (user) => {
    const savedUser = await userModel.add(user)
    return savedUser
}
module.exports = {
    fetchUsers,
    findUser,
    userExists
}