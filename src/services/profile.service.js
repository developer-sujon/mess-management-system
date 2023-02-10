//External Lib Import
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

//Internal Lib Import
const catchAsync = require('../utils/catchAsync');
const { User } = require('../models');
const { commonService } = require('../services');

/**
 * @desc profile details
 * @returns {Promise<Profile>}
 */

const profileDetails = (request) => {
  const { proprietorID, messID, _id, role } = request.user;

  const matchQuery = {
    $match: {
      proprietorID: ObjectId(proprietorID),
      messID: ObjectId(messID),
      _id: ObjectId(_id),
    },
  };

  let joinStage;
  if (role === 'proprietor') {
    joinStage = {
      $lookup: {
        from: 'proprietors',
        localField: 'proprietorID',
        foreignField: '_id',
        as: 'profile',
      },
    };
  } else {
    joinStage = {
      $lookup: {
        from: 'staffs',
        localField: '_id',
        foreignField: 'userID',
        as: 'profile',
      },
    };
  }

  const replaceProperty = {
    $set: {
      photo: { $first: '$profile.photo' },
      address: { $first: '$profile.address' },
      district: { $first: '$profile.district' },
      thana: { $first: '$profile.thana' },
      permissions: { $first: '$profile.permissions' },
    },
  };

  const projection = {
    $project: {
      proprietorID: 0,
      messID: 0,
      _id: 0,
      password: 0,
      profile: 0,
    },
  };

  return commonService.detailsJoinService(User, matchQuery, joinStage, projection, replaceProperty);
};

/**
 * @desc profile update
 * @returns {Promise<Profile>}
 */

const profileUpdate = (request) => {
  const { proprietorID, messID } = request.user;

  const matchQuery = {
    proprietorID: ObjectId(proprietorID),
    messID: ObjectId(messID),
    _id: ObjectId(request.params.id),
  };
  const errorMessage = 'profile not found';
  return commonService.updateService(User, matchQuery, request.body, errorMessage);
};

/**
 * @desc profile delete
 * @returns {Promise<Profile>}
 */

const profileDelete = (request) => {
  const { proprietorID, messID } = request.user;

  const matchQuery = {
    proprietorID: ObjectId(proprietorID),
    messID: ObjectId(messID),
    _id: ObjectId(request.params.id),
  };
  const errorMessage = 'profile not found';
  return commonService.deleteService(User, matchQuery, errorMessage);
};

module.exports = {
  profileDetails,
  profileUpdate,
  profileDelete,
};
