// const assignmentQuery = require('../models/assignments');
const assignmentQuery = require('../models/assignments');

const getAssignments = async (req, res) => {
  try {
    const assignments = await assignmentQuery.fetchAssignments();
    return res.json(assignments);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const submitAssignment = async (req, res) => {
  try {
    const { id, link } = req.body;
    const { name } = req.userData;
    await assignmentQuery.fetchAssignment(id, link, name);
    return res.json({ message: 'Submitted assignment successfully!' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getAssignments,
  submitAssignment
};
