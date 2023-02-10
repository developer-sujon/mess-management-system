//External Lib Import
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const httpStatus = require('http-status');

//Internal Lib Import
const catchAsync = require('../utils/catchAsync');
const { memberService, userService, commonService } = require('../services');

/**
 * @desc member create
 * @access private
 * @route /api/v1/member/memberCreate
 * @methud POST
 */

const memberCreate = async (req, res, next) => {
  const session = await mongoose.startSession();
  const { proprietorID, messID } = req.user;

  try {
    session.startTransaction();
    const user = await userService.createUser({ proprietorID, messID, password: 'pass1234', ...req.body }, session);

    req.body.userID = user._id;
    await memberService.memberCreate(req, session);

    await session.commitTransaction();
    session.endSession();

    res.status(httpStatus.CREATED).json({ message: 'Member Create Successfully Pasword pass1234' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

/**
 * @desc member dropDown
 * @access private
 * @route /api/v1/member/memberdropDown
 * @methud GET
 */

const memberDropDown = catchAsync(async (req, res) => {
  const data = await memberService.memberDropDown(req);
  res.json(data);
});

/**
 * @desc member list
 * @access private
 * @route /api/v1/member/memberList
 * @methud GET
 */

const memberList = catchAsync(async (req, res) => {
  const data = await memberService.memberList(req);
  res.json(data);
});

/**
 * @desc member details
 * @access private
 * @route /api/v1/member/memberDetails/:id
 * @methud GET
 */

const memberDetails = catchAsync(async (req, res) => {
  const data = await memberService.memberDetails(req);
  res.json(data);
});

/**
 * @desc member update
 * @access private
 * @route /api/v1/member/memberUpdate/:id
 * @methud PATCH
 */

const memberUpdate = catchAsync(async (req, res) => {
  await memberService.memberUpdate(req);
  res.json({ message: 'Member Update Successfull' });
});

/**
 * @desc member delete
 * @access private
 * @route /api/v1/member/memberDelete/:id
 * @methud DELETE
 */

const memberDelete = async (req, res, next) => {
  const session = await mongoose.startSession();
  const matchQuery = {
    proprietorID: ObjectId(req.user.proprietorID),
    messID: ObjectId(req.user.messID),
    userID: ObjectId(req.params.userID),
  };

  const errorMessage = 'Member Not Found';

  try {
    session.startTransaction();
    await commonService.deleteService(matchQuery, errorMessage, session);

    req.body.userID = user._id;
    await memberService.memberCreate(req, session);

    await session.commitTransaction();
    session.endSession();

    res.json({ message: 'Member Remove Successfull' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

module.exports = {
  memberCreate,
  memberDropDown,
  memberList,
  memberDetails,
  memberUpdate,
  memberDelete,
};
