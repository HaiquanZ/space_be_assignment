const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

router.post('/create', assignmentController.createAssignment);
router.get('/', assignmentController.getDetailAssignment);
router.post('/phase/update', assignmentController.updatePhase);
router.post('/task/create', assignmentController.addTask);
router.get('/task', assignmentController.getTask);
router.post('/task/update', assignmentController.updateTask);
router.get('/task/pic', assignmentController.getTaskByuser);

module.exports = router;