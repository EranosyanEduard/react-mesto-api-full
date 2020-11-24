const router = require('express').Router();
const {
  createCard,
  dislikeCard,
  getCards,
  likeCard,
  removeCard
} = require('../controllers/cards');
const {
  celebrateCardCreation,
  celebrateCardStateChanging
} = require('../middlewares/validator');

router.get('/cards', getCards);
router.post('/cards', celebrateCardCreation(), createCard);
router.delete('/cards/:cardId', celebrateCardStateChanging(), removeCard);
router.put('/cards/:cardId/likes', celebrateCardStateChanging(), likeCard);
router.delete('/cards/:cardId/likes', celebrateCardStateChanging(), dislikeCard);

module.exports = router;
