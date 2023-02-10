//Internal Lib Import
const express = require('express');

//External Lib Import
const { auth, accessPermission } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const profileValidation = require('../../validations/profile.validation');
const profileController = require('../../controllers/profile.controller');

const router = express.Router();

router.get('/profileDetails', auth(['proprietor', 'admin']), profileController.profileDetails);

router.patch(
  '/profileUpdate/:id',
  auth(['proprietor', 'admin']),
  validate(profileValidation.profileUpdate),
  profileController.profileUpdate
);

router.delete(
  '/profileDelete/:id',
  auth(['proprietor', 'admin']),
  validate(profileValidation.profileDelete),
  profileController.profileDelete
);

module.exports = router;
