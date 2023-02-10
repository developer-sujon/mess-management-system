//External Lib Import
const mongoose = require('mongoose');
const validator = require('validator');

//Internal Lib Import
const { toJSON, paginate } = require('./plugins');
const permissions = require('../config/permissions');

const memberSchema = new mongoose.Schema(
  {
    proprietorID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Proprietor',
    },
    messID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Mess',
    },
    userID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!value.match('^(?:\\+88|88)?(01[3-9]\\d{8})$')) {
          throw new Error('Please enter the correct number');
        }
      },
    },
    nid: {
      type: String,
      min: 3,
      max: 20,
    },
    address: {
      type: String,
      required: true,
      min: 3,
      max: 100,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      trim: true,
    },
    thana: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      trim: true,
    },
    photo: {
      type: Object,
      default: null,
    },
    permissions: permissions,
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive', 'banned', 'deleted'],
      default: 'active',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
memberSchema.plugin(toJSON);
memberSchema.plugin(paginate);

/**
 * Check if mobile is taken
 * @param {string} mobile - The user's mobile
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
memberSchema.statics.isMobileTaken = async function (mobile, excludeUserId) {
  const user = await this.findOne({ mobile, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * @typedef member
 */
const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
