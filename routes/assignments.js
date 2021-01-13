const express = require('express');
const authenticate = require('../middlewares/authenticate');
const assignmentsController = require('../controllers/assignments');

const router = express.Router();

router.get('/', authenticate.isUser, assignmentsController.getAssignments);
router.post('/submit', authenticate.isUser, assignmentsController.submitAssignment);

module.exports = router;
