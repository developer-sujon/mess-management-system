const Joi = require('joi');
const { objectId } = require('./custom.validation');

const attendanceCreate = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    status: Joi.boolean(),
  }),
};

const attendanceDetails = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const attendanceUpdate = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    status: Joi.boolean(),
  }),
};

const attendanceDelete = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  attendanceCreate,
  attendanceDetails,
  attendanceUpdate,
  attendanceDelete,
};
