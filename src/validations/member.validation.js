const Joi = require('joi');
const { password, objectId, mobile } = require('./custom.validation');

const memberCreate = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    mobile: Joi.string().required().custom(mobile),
    address: Joi.string().min(3).max(100).required(),
    district: Joi.string().min(3).max(30).required(),
    thana: Joi.string().min(3).max(30).required(),
    nid: Joi.string().min(3).max(20),
  }),
};

const memberDetails = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const memberUpdate = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    mobile: Joi.string().required().custom(mobile),
    address: Joi.string().min(3).max(100).required(),
    district: Joi.string().min(3).max(30).required(),
    thana: Joi.string().min(3).max(30).required(),
    nid: Joi.string().min(3).max(20),
    status: Joi.string(),
  }),
};

const memberDelete = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  memberCreate,
  memberDetails,
  memberUpdate,
  memberDelete,
};
