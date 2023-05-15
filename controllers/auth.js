const {
  constants: { HTTP_STATUS_CREATED },
} = require('http2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { AuthError, ConfictError } = require('../utils/errors');
const User = require('../models/user');

const { JWT_SECRET } = process.env;
const authError = new AuthError('Неправильно указаны данные авторизации');

async function createUser(req, res, next) {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }, { rawResult: true, fields: ['_id'] });

    if (user) throw new ConfictError('пользователь с такой электронной почтой уже зарегистрирован');

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({ email, password: hashPassword });

    res.status(HTTP_STATUS_CREATED).send(user);
  } catch (err) {
    next(err);
  }
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select({ password: 1 });

    if (!user) throw authError;

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) throw authError;

    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET || 'superpuperpassword',
      { expiresIn: '7d' },
    );

    res.send({
      token,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  loginUser,
};
