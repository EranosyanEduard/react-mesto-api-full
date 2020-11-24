const Card = require('../models/card');
const { ForbiddenError, NotFoundError } = require('../errors/errors');

const createCard = (req, res, next) => {
  const { body, user } = req;
  Card.create({
    ...body,
    owner: user._id
  })
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

const getCards = (_, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const removeCard = (req, res, next) => {
  const { params, user } = req;
  Card.findById(params.cardId)
    .orFail(() => new NotFoundError('Карточка не найдена!'))
    .populate(['owner', 'likes'])
    .then((card) => {
      const errorMessage = 'При попытке удаления карточки произошла ошибка!';
      if (card.owner._id.toString() === user._id) {
        return Card.deleteOne({ _id: card._id })
          .orFail(() => new Error(errorMessage))
          .then(() => card);
      }
      return Promise.reject(new ForbiddenError(errorMessage));
    })
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

const handleLike = (cardId, updateObject, res) => (
  Card.findByIdAndUpdate(cardId, updateObject, { new: true })
    .orFail(() => new NotFoundError('Карточка не найдена!'))
    .populate(['owner', 'likes'])
    .then((card) => {
      res.send(card);
    })
);

const dislikeCard = (req, res, next) => {
  const updateObject = { $pull: { likes: req.user._id } };
  handleLike(req.params.cardId, updateObject, res)
    .catch(next);
};

const likeCard = (req, res, next) => {
  const updateObject = { $addToSet: { likes: req.user._id } };
  handleLike(req.params.cardId, updateObject, res)
    .catch(next);
};

module.exports = {
  createCard,
  dislikeCard,
  getCards,
  likeCard,
  removeCard
};
