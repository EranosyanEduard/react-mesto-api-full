const Card = require('../models/card');
const { DocumentNotFoundException, handleError } = require('../utils/utils');

const createCard = (request, response) => {
  const { body, user } = request;
  Card.create({ ...body, owner: user._id })
    .then((card) => {
      response.send(card);
    })
    .catch((error) => {
      handleError(error, response);
    });
};

const getCards = (_, response) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      response.send(cards);
    })
    .catch((error) => {
      handleError(error, response);
    });
};

const removeCard = (request, response) => {
  const { params, user } = request;
  Card.findById(params.cardId)
    .orFail(() => new DocumentNotFoundException('Card document not found'))
    .populate(['owner', 'likes'])
    .then((card) => {
      const errorMessage = 'Ошибка при удалении документа Card!';
      if (card.owner === user._id) {
        return Card.deleteOne({ id: card._id })
          .then(() => card)
          .catch(() => new Error(errorMessage));
      }
      return Promise.reject(new Error(errorMessage));
    })
    .then((card) => {
      response.send(card);
    })
    .catch((error) => {
      handleError(error, response);
    });
};

const handleLike = (cardId, updateObject, response) => {
  Card.findByIdAndUpdate(cardId, updateObject, { new: true })
    .orFail(() => new DocumentNotFoundException('Card document not found'))
    .populate(['owner', 'likes'])
    .then((card) => {
      response.send(card);
    })
    .catch((error) => {
      handleError(error, response);
    });
};

const dislikeCard = (request, response) => {
  const updateObject = { $pull: { likes: request.user._id } };
  handleLike(request.params.cardId, updateObject, response);
};

const likeCard = (request, response) => {
  const updateObject = { $addToSet: { likes: request.user._id } };
  handleLike(request.params.cardId, updateObject, response);
};

module.exports = {
  createCard,
  dislikeCard,
  getCards,
  likeCard,
  removeCard
};
