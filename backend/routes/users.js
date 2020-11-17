const router = require('express').Router();
const {
  getCurrentUser,
  getUsers,
  updateAvatar,
  updateUser
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
