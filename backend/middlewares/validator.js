const { celebrate, Joi } = require('celebrate');

const celebrateUserCreation = () => (
  celebrate({
    body: Joi
      .object()
      .keys({
        email: Joi
          .string()
          .required()
          .email(),
        password: Joi
          .string()
          .required()
          .token(),
        name: Joi
          .string()
          .min(2)
          .max(30),
        about: Joi
          .string()
          .min(2)
          .max(30),
        link: Joi
          .string()
          .uri()
      })
  })
);

const celebrateUserLogin = () => (
  celebrate({
    body: Joi
      .object()
      .keys({
        email: Joi
          .string()
          .required()
          .email(),
        password: Joi
          .string()
          .required()
      })
  })
);

const celebrateUserAuthorization = () => (
  celebrate({
    headers: Joi
      .object()
      .keys({
        authorization: Joi
          .string()
          .required()
      })
      .unknown()
  })
);

const celebrateUserUpdate = () => (
  celebrate({
    body: Joi
      .object()
      .keys({
        name: Joi
          .string()
          .required()
          .min(2)
          .max(30),
        about: Joi
          .string()
          .required()
          .min(2)
          .max(30)
      })
  })
);

const celebrateAvatarUpdate = () => (
  celebrate({
    body: Joi
      .object()
      .keys({
        link: Joi
          .string()
          .required()
          .uri()
      })
  })
);

const celebrateCardCreation = () => (
  celebrate({
    body: Joi
      .object()
      .keys({
        name: Joi
          .string()
          .required()
          .min(2)
          .max(30),
        link: Joi
          .string()
          .required()
          .uri()
      })
  })
);

const celebrateCardStateChanging = () => (
  celebrate({
    params: Joi
      .object()
      .keys({
        cardId: Joi
          .string()
          .hex()
          .length(24)
      })
  })
);

module.exports = {
  celebrateUserCreation,
  celebrateUserLogin,
  celebrateUserAuthorization,
  celebrateAvatarUpdate,
  celebrateUserUpdate,
  celebrateCardCreation,
  celebrateCardStateChanging
};
