const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

// Create
router.post('/members', memberController.createMember);

// Get all
router.get('/members', memberController.getAllMembers);

// Get by ID
router.get('/members/:id', memberController.getMemberById);

// Update by ID
router.put('/members/:id', memberController.updateMember);

// Delete by ID
router.delete('/members/:id', memberController.deleteMember);

module.exports = router;
