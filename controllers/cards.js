const Card = require('../models/card');
const { NotFound, BadRequest } = require('../utils/errors');

async function getCards(req, res, next) {
  try {
    const cards = await Card.find({}).populate('owner');

    res.send(cards);
  } catch (err) {
    next(err);
  }
}

async function createCard(req, res, next) {
  const { name, link } = req.body;
  const userId = req.user._id;

  try {
    const card = await Card.create({ name, link, owner: userId });

    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

async function addLike(req, res, next) {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    )
      .populate('owner')
      .populate('likes');

    if (!card) throw new NotFound('карточка не найдена');

    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

async function removeLike(req, res, next) {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    )
      .populate('owner')
      .populate('likes');

    if (!card) throw new NotFound('карточка не найдена');

    res.send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

async function removeCard(req, res, next) {
  const { cardId } = req.params;

  try {
    const card = await Card.findById(cardId).populate('owner');

    if (!card) throw new NotFound('карточка не найдена');

    await card.deleteOne();

    res.send(card);
  } catch (err) {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

module.exports = {
  getCards,
  createCard,
  addLike,
  removeLike,
  removeCard,
};
