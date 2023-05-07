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
    if (err.name === 'CastError') {
      next(new BadRequest('переданы некорректные данные'));
    }
    next(err);
  }
}

async function createUser(req, res, next) {
  const { name, avatar, about } = req.body;

  try {
    const user = await User.create({ name, avatar, about });

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

async function updateUser(req, res, next) {
  const { name, about } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name, about },
      { runValidators: true, new: true },
    );

    if (!user) throw new NotFound('пользователь не найден');

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

async function updateUserAvatar(req, res, next) {
  const { avatar } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { runValidators: true, new: true },
    );

    if (!user) throw new NotFound('пользователь не найден');

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
