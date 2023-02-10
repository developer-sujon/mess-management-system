//External Lib Import
const mongoose = require('mongoose');

//Internal Lib Import
const { toJSON, paginate } = require('./plugins');

const roleSchema = mongoose.Schema(
  {
    proprietorID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Proprietor',
    },
    messID: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Store',
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    permissions: {
      type: Object,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);

/**
 * @typedef role
 */
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
