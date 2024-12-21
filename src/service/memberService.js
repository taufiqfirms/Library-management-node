const Member = require('../models/member');

// Create
const createMember = async (memberData) => {
  try {
    const member = await Member.create(memberData);
    return member;
  } catch (error) {
    throw new Error('Error creating member');
  }
};

// Update by ID
const updateMember = async (id, memberData) => {
  try {
    const member = await Member.findByPk(id);
    if (!member) {
      throw new Error('Member not found');
    }
    await member.update(memberData);
    return member;
  } catch (error) {
    throw new Error('Error updating member');
  }
};

// Delete by ID
const deleteMember = async (id) => {
  try {
    const member = await Member.findByPk(id);
    if (!member) {
      throw new Error('Member not found');
    }
    await member.destroy();
    return { message: 'Member deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting member');
  }
};

// Get all with Pagination
const getMembersWithPagination = async (page = 1, limit = 10, filters = {}) => {
  try {
    const offset = (page - 1) * limit;
    const { name, email } = filters;

    const condition = {};
    if (name) condition.name = { [Sequelize.Op.like]: `%${name}%` };
    if (email) condition.email = { [Sequelize.Op.like]: `%${email}%` };

    const { count, rows } = await Member.findAndCountAll({
      where: condition,
      limit: limit,
      offset: offset,
    });

    const totalPages = Math.ceil(count / limit);
    return {
      data: rows,
      pagination: {
        total: count,
        page: page,
        limit: limit,
        totalPages: totalPages,
      },
    };
  } catch (error) {
    throw new Error('Error fetching members');
  }
};

module.exports = {
  createMember,
  updateMember,
  deleteMember,
  getMembersWithPagination,
};
