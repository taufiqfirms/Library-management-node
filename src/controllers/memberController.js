const Member = require('../models/member');

// Create
exports.createMember = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const newMember = await Member.create({ name, email, phone, address });
    res.status(201).json({ message: 'Member created successfully!', member: newMember });
  } catch (error) {
    res.status(500).json({ message: 'Error creating member', error: error.message });
  }
};

// Read
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll();
    res.status(200).json({ members });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members', error: error.message });
  }
};

// Read by id
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json({ member });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching member', error: error.message });
  }
};

// Update by id
exports.updateMember = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    member.name = name || member.name;
    member.email = email || member.email;
    member.phone = phone || member.phone;
    member.address = address || member.address;

    await member.save();
    res.status(200).json({ message: 'Member updated successfully!', member });
  } catch (error) {
    res.status(500).json({ message: 'Error updating member', error: error.message });
  }
};

// Delete by id
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    await member.destroy();
    res.status(200).json({ message: 'Member deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member', error: error.message });
  }
};
