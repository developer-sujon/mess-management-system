//External Lib Import
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

//Internal Lib Import
const catchAsync = require('../utils/catchAsync');
const { roleService } = require('../services');
const httpStatus = require('http-status');

/**
 * @desc role create
 * @access private
 * @route /api/v1/role/roleCreate
 * @methud POST
 */

const roleCreate = catchAsync(async (req, res) => {
  await roleService.roleCreate(req);
  res.status(httpStatus.CREATED).json({ message: 'Role Create Successfully' });
});

/**
 * @desc role dropDown
 * @access private
 * @route /api/v1/role/roledropDown
 * @methud GET
 */

const roleDropDown = catchAsync(async (req, res) => {
  const data = await roleService.roleDropDown(req);
  res.json(data);
});

/**
 * @desc role list
 * @access private
 * @route /api/v1/role/roleList
 * @methud GET
 */

const roleList = catchAsync(async (req, res) => {
  const data = await roleService.roleList(req);
  res.json(data);
});

/**
 * @desc role details
 * @access private
 * @route /api/v1/role/roleDetails/:id
 * @methud GET
 */

const roleDetails = catchAsync(async (req, res) => {
  const data = await roleService.roleDetails(req);
  res.json(data);
});

/**
 * @desc role update
 * @access private
 * @route /api/v1/role/roleUpdate/:id
 * @methud PATCH
 */

const roleUpdate = catchAsync(async (req, res) => {
  await roleService.roleUpdate(req);
  res.json({ message: 'Role Update Successfull' });
});

/**
 * @desc role delete
 * @access private
 * @route /api/v1/role/roleDelete/:id
 * @methud DELETE
 */

const roleDelete = catchAsync(async (req, res) => {
  await roleService.roleDelete(req);
  res.json({ message: 'Role Remove Successfull' });
});

module.exports = {
  roleCreate,
  roleDropDown,
  roleList,
  roleDetails,
  roleUpdate,
  roleDelete,
};
