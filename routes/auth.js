const express = require('express');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const { createUser, loginUser } = require('../controllers/auth');

const auth = express.Router();

function validateEmail(value, helpers) {
  return validator.isEmail(value) ? value : helpers.error('email.invalid');
}

const authValidator = celebrate({
  body: {
    email: Joi.required().custom(validateEmail),
    password: Joi.string().required(),
  },
});

auth.post('/signup', authValidator, createUser);
auth.post('/signin', authValidator, loginUser);

module.exports = auth;
