const express = require('express');
const { createMemberController, updateMemberController, deleteMemberController, getMembersController } = require('../controllers/memberController');
const router = express.Router();

// Create
router.post('/', createMemberController);

// Update
router.put('/:id', updateMemberController);

// Delete
router.delete('/:id', deleteMemberController);

// Get all
router.get('/', getMembersController);

module.exports = router;
