//External Lib Import
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const httpStatus = require('http-status');

//Internal Lib Import
const catchAsync = require('../utils/catchAsync');
const { profileService } = require('../services');

/**
 * @desc profile details
 * @access private
 * @route /api/v1/profile/profileDetails/:id
 * @methud GET
 */

const profileDetails = catchAsync(async (req, res) => {
  const data = await profileService.profileDetails(req);
  res.json(data[0]);
});

/**
 * @desc profile update
 * @access private
 * @route /api/v1/profile/profileUpdate/:id
 * @methud PATCH
 */

const profileUpdate = catchAsync(async (req, res) => {
  await profileService.profileUpdate(req);
  res.json({ message: 'profile Update Successfull' });
});

/**
 * @desc profile delete
 * @access private
 * @route /api/v1/profile/profileDelete/:id
 * @methud DELETE
 */

const profileDelete = catchAsync(async (req, res) => {
  await profileService.profileDelete(req);
  res.json({ message: 'profile Remove Successfull' });
});

module.exports = {
  profileDetails,
  profileUpdate,
  profileDelete,
};
