const express = require('express');

const users = express.Router();
const {
  getAllUsers, getUserById, createUser, updateUser, updateUserAvatar,
} = require('../controllers/users');

users.get('/', getAllUsers);
users.post('/', createUser);
users.get('/:userId', getUserById);
users.patch('/me', updateUser);
users.patch('/me/avatar', updateUserAvatar);

module.exports = users;
