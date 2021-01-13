const { assignmentValidation } = require('../middlewares/validators/assignmentValidator');
const assignmentQuery = require('../models/assignments');

const createAssignment = async (req, res) => {
  const { error } = assignmentValidation(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const { name } = req.userData;
    const d = Date.now();
    const date = new Date(d);
    const dateString = date.toDateString();
    const assignment = {
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      createdOn: dateString,
      from: name,
      submissions: [] // Send empty array initially
    };
    await assignmentQuery.addAssignment(assignment);
    return res.json({ message: 'Assignment created successfully!' });
  } catch (err) {
    return res.status(502).json({ message: err });
  }
};

const viewAssignments = async (req, res) => {
  try {
    const assignments = await assignmentQuery.fetchAssignments();
    return res.json(assignments);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  createAssignment,
  viewAssignments
};
