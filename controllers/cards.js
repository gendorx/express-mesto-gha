const {
  Error: { ValidationError, CastError },
} = require('mongoose');
const {
  constants: { HTTP_STATUS_CREATED },
} = require('http2');
const Card = require('../models/card');
const { NotFound, BadRequest, ForbiddenError } = require('../utils/errors');

async function getCards(req, res, next) {
  try {
    const cards = await Card.find({}).populate(['owner', 'likes']);

    res.send(cards);
  } catch (err) {
    next(err);
  }
}

async function createCard(req, res, next) {
  const userId = req.user._id;

  try {
    const card = await Card.create({ ...req.body, owner: userId });

    res.status(HTTP_STATUS_CREATED).send(card);
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

async function toggleLike(fnName, req, res, next) {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { [fnName]: { likes: userId } },
      { new: true },
    ).populate(['owner', 'likes']);

    if (!card) throw new NotFound('карточка не найдена');

    res.send(card);
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

function addLike(req, res, next) {
  return toggleLike('$addToSet', req, res, next);
}

function removeLike(req, res, next) {
  return toggleLike('$pull', req, res, next);
}

async function removeCard(req, res, next) {
  const { cardId } = req.params;
  const userId = req.user._id;

  try {
    const card = await Card.findById(cardId).populate('owner');

    if (!card) throw new NotFound('карточка не найдена');
    if (card.owner._id !== userId) throw new ForbiddenError('невозможно удалить чужую карточку');

    await card.deleteOne();

    res.send(card);
  } catch (err) {
    if (err instanceof CastError) {
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
