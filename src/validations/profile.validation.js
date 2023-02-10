const Joi = require('joi');
const { objectId } = require('./custom.validation');

const profileUpdate = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    status: Joi.boolean(),
  }),
};

const profileDelete = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  profileUpdate,
  profileDelete,
};
