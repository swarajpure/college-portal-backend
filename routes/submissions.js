const express = require('express');
const authenticate = require('../middlewares/authenticate');
const submissionController = require('../controllers/submissions');

const router = express.Router();

router.get('/', authenticate.isTeacher, submissionController.viewAssignments);
router.post('/create', authenticate.isTeacher, submissionController.createAssignment);

module.exports = router;
