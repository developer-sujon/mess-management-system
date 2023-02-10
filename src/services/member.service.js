//External Lib Import
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

//Internal Lib Import
const catchAsync = require('../utils/catchAsync');
const { Member } = require('../models');
const { commonService, userService } = require('.');

/**
 * @desc member create
 * @returns {Promise<Member>}
 */

const memberCreate = (request, session) => {
  const { proprietorID, messID } = request.user;
  const postBody = {
    proprietorID,
    messID,
    ...request.body,
  };
  const unique = false;
  const uniqueValue = {};
  const errorMessage = '';
  return commonService.createService(Member, unique, uniqueValue, errorMessage, postBody, session);
};

/**
 * @desc member dropDown
 * @returns {Promise<Member>}
 */

const memberDropDown = (request) => {
  const { proprietorID, messID } = request.user;

  const matchQuery = {
    $match: {
      proprietorID: ObjectId(proprietorID),
      messID: ObjectId(messID),
      status: 'active',
    },
  };

  const projection = {
    $project: {
      _id: 0,
      value: '$_id',
      label: '$name',
    },
  };

  return commonService.listService(Member, matchQuery, projection);
};

/**
 * @desc member list
 * @returns {Promise<Member>}
 */

const memberList = (request) => {
  const { proprietorID, messID } = request.user;

  const matchQuery = {
    $match: {
      proprietorID: ObjectId(proprietorID),
      messID: ObjectId(messID),
      status: 'active',
    },
  };

  const projection = {
    $project: {
      proprietorID: 0,
      messID: 0,
    },
  };

  return commonService.listService(Member, matchQuery, projection);
};

/**
 * @desc member details
 * @returns {Promise<Member>}
 */

const memberDetails = (request) => {
  const { proprietorID, messID } = request.user;

  const matchQuery = {
    $match: {
      proprietorID: ObjectId(proprietorID),
      messID: ObjectId(messID),
      _id: ObjectId(request.params.id),
    },
  };

  const projection = {
    $project: {
      proprietorID: 0,
      messID: 0,
    },
  };

  return commonService.detailsService(Member, matchQuery, projection);
};

/**
 * @desc member update
 * @returns {Promise<Member>}
 */

const memberUpdate = (request) => {
  const { proprietorID, messID } = request.user;

  const matchQuery = {
    proprietorID: ObjectId(proprietorID),
    messID: ObjectId(messID),
    _id: ObjectId(request.params.id),
  };
  const errorMessage = 'Member not found';
  return commonService.updateService(Member, matchQuery, request.body, errorMessage);
};

/**
 * @desc member delete
 * @returns {Promise<Member>}
 */

const memberDelete = (request) => {
  const { proprietorID, messID } = request.user;

  const matchQuery = {
    proprietorID: ObjectId(proprietorID),
    messID: ObjectId(messID),
    _id: ObjectId(request.params.id),
  };
  const errorMessage = 'Member not found';
  return commonService.deleteService(Member, matchQuery, errorMessage);
};

module.exports = {
  memberCreate,
  memberDropDown,
  memberList,
  memberDetails,
  memberUpdate,
  memberDelete,
};
