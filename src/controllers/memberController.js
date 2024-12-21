const { createMember, updateMember, deleteMember, getMembersWithPagination } = require('../service/memberService');

// Create
const createMemberController = async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const newMember = await createMember({ name, email, phone, address });
    res.status(201).json({ message: 'Member created successfully', member: newMember });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a member by id
const updateMemberController = async (req, res) => {
  const { id } = req.params;
  const memberData = req.body;
  try {
    const updatedMember = await updateMember(id, memberData);
    res.status(200).json({ message: 'Member updated successfully', member: updatedMember });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a member by id
const deleteMemberController = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteMember(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all members with pagination
const getMembersController = async (req, res) => {
  const { page, limit, name, email } = req.query;
  try {
    const { data, pagination } = await getMembersWithPagination(
      parseInt(page, 10) || 1,
      parseInt(limit, 10) || 10,
      { name, email }
    );
    res.status(200).json({ data, pagination });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMemberController,
  updateMemberController,
  deleteMemberController,
  getMembersController,
};
