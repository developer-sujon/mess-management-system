//External Lib Import
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//Internal Lib Import
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const messSchema = mongoose.Schema(
  {
    proprietorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proprietor',
      required: true,
    },
    messName: {
      type: String,
      required: true,
      min: 3,
      max: 100,
      trim: true,
    },
    mobile: {
      type: String,
      validate(value) {
        if (!value.match('^(?:\\+88|88)?(01[3-9]\\d{8})$')) {
          throw new Error('Please enter the correct number');
        }
      },
      required: true,
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
    messSettings: {
      type: Object,
      default: {},
    },
    ASSettings: {
      installationCharge: {
        type: Number,
        required: true,
        default: 30000,
      },
      monthlyServiceCharge: {
        type: Number,
        required: true,
        default: 1000,
      },
      UISettings: {
        warranty: {
          type: Boolean,
          default: false,
        },
      },
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'active', 'inactive', 'banned', 'deleted'],
      default: 'new',
    },
    messPaymentStatus: {
      type: String,
      enum: ['paid', 'unpaid'],
      default: 'unpaid',
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
messSchema.plugin(toJSON);
messSchema.plugin(paginate);

/**
 * @typedef Mess
 */
const Mess = mongoose.model('Mess', messSchema);

module.exports = Mess;
