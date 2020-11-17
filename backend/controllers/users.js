const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { DocumentNotFoundError, handleError } = require('../utils/utils');

const createUser = (request, response) => {
  const { password, link, ...otherProps } = request.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      password: hash,
      avatar: link,
      ...otherProps
    }))
    .then((user) => User.findById(user._id))
    .then((user) => {
      response.send(user);
    })
    .catch((error) => {
      handleError(error, response, 'createUser');
    });
};

const getCurrentUser = (request, response) => {
  User.findById(request.user._id)
    .orFail(() => new DocumentNotFoundError('User document not found'))
    .then((user) => {
      response.send(user);
    })
    .catch((error) => {
      handleError(error, response);
    });
};

const getUsers = (_, response) => {
  User.find({})
    .then((users) => {
      response.send(users);
    })
    .catch((error) => {
      handleError(error, response);
    });
};

const login = (request, response) => {
  User.findUserByCredentials(request.body)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '7d' }
      );
      response.send({ token });
    })
    .catch((error) => {
      response.status(401).send({ error: error.message });
    });
};

const handleUpdateUser = (userId, updateObject, response) => {
  User.findByIdAndUpdate(userId, updateObject, {
    new: true,
    runValidators: true
  })
    .orFail(() => new DocumentNotFoundError('User document not found'))
    .then((user) => {
      response.send(user);
    })
    .catch((error) => {
      handleError(error, response);
    });
};

const updateAvatar = (request, response) => {
  const { link } = request.body;
  handleUpdateUser(request.user._id, { avatar: link }, response);
};

const updateUser = (request, response) => {
  const { name, about } = request.body;
  handleUpdateUser(request.user._id, { name, about }, response);
};

module.exports = {
  createUser,
  getCurrentUser,
  getUsers,
  login,
  updateAvatar,
  updateUser
};
