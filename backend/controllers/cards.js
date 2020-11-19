const Card = require('../models/card');
const { ForbiddenError, NotFoundError } = require('../errors/errors');

const createCard = (request, response, next) => {
  const { body, user } = request;
  Card.create({
    ...body,
    owner: user._id
  })
    .then((card) => {
      response.send(card);
    })
    .catch(next);
};

const getCards = (_, response, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      response.send(cards);
    })
    .catch(next);
};

const removeCard = (request, response, next) => {
  const { params, user } = request;
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
      response.send(card);
    })
    .catch(next);
};

const handleLike = (cardId, updateObject, response) => (
  Card.findByIdAndUpdate(cardId, updateObject, { new: true })
    .orFail(() => new NotFoundError('Карточка не найдена!'))
    .populate(['owner', 'likes'])
    .then((card) => {
      response.send(card);
    })
);

const dislikeCard = (request, response, next) => {
  const updateObject = { $pull: { likes: request.user._id } };
  handleLike(request.params.cardId, updateObject, response)
    .catch(next);
};

const likeCard = (request, response, next) => {
  const updateObject = { $addToSet: { likes: request.user._id } };
  handleLike(request.params.cardId, updateObject, response)
    .catch(next);
};

module.exports = {
  createCard,
  dislikeCard,
  getCards,
  likeCard,
  removeCard
};
