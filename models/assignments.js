const { db } = require('../firestore');

const assignmentModel = db.collection('assignments');

const addAssignment = async (data) => {
  try {
    const savedAssignment = await assignmentModel.add(data);
    return savedAssignment;
  } catch (err) {
    return err;
  }
};

const fetchAssignment = async (id, link, name) => {
  try {
    const assignment = await assignmentModel.doc(id).get();
    const { submissions } = assignment.data();
    submissions.push({
      name,
      link
    });
    await assignmentModel.doc(id).set({
      ...assignment.data(),
      submissions
    });
    return true;
  } catch (err) {
    return err;
  }
};

const fetchAssignments = async () => {
  try {
    const snapshot = await assignmentModel.get();
    const allAssignments = [];
    snapshot.forEach((doc) => {
      allAssignments.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return allAssignments;
  } catch (err) {
    return err;
  }
};

module.exports = {
  addAssignment,
  fetchAssignment,
  fetchAssignments
};
