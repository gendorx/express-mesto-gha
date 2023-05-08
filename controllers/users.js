const {
  Error: { ValidationError, CastError },
} = require('mongoose');
const {
  constants: { HTTP_STATUS_CREATED },
} = require('http2');
const User = require('../models/user');
const { NotFound, BadRequest } = require('../utils/errors');

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res, next) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) throw new NotFound('пользователь не найден');

    res.send(user);
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

async function createUser(req, res, next) {
  const { name, avatar, about } = req.body;

  try {
    const user = await User.create({ name, avatar, about });

    res.status(HTTP_STATUS_CREATED).send(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

async function updateUser(data, req, res, next) {
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
      new: true,
    });

    if (!user) throw new NotFound('пользователь не найден');

    res.send(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

function updateUserInfo(req, res, next) {
  const { name, about } = req.body;

  return updateUser({ name, about }, req, res, next);
}

function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;

  return updateUser({ avatar }, req, res, next);
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
