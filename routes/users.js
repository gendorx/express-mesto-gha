const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { validatonUrl } = require('../utils/utils');

const users = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

users.get('/', getAllUsers);
users.get('/me', getCurrentUser);
users.get(
  '/:userId',
  celebrate({
    params: { userId: Joi.string().required().alphanum().length(24) },
  }),
  getUserById,
);
users.patch(
  '/me',
  celebrate({
    body: {
      about: Joi.string().required().min(2).max(30),
      name: Joi.string().required().min(2).max(30),
    },
  }),
  updateUser,
);
users.patch(
  '/me/avatar',
  celebrate({ body: { avatar: Joi.string().required().custom(validatonUrl) } }),
  updateUser,
);

module.exports = users;
