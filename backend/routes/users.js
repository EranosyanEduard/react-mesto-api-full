const router = require('express').Router();
const {
  getCurrentUser,
  getUsers,
  updateAvatar,
  updateUser
} = require('../controllers/users');
const {
  celebrateAvatarUpdate,
  celebrateUserUpdate
} = require('../middlewares/validator');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', celebrateUserUpdate(), updateUser);
router.patch('/users/me/avatar', celebrateAvatarUpdate(), updateAvatar);

module.exports = router;
