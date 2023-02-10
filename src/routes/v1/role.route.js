//Internal Lib Import
const express = require('express');

//External Lib Import
const { auth, accessPermission } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roleValidation = require('../../validations/role.validation');
const roleController = require('../../controllers/role.controller');

const router = express.Router();

router.post(
  '/roleCreate',
  auth(['proprietor', 'admin']),
  accessPermission('roleCreate'),
  validate(roleValidation.roleCreate),
  roleController.roleCreate
);

router.get('/roleList', auth(['proprietor', 'admin']), roleController.roleList);
router.get('/roledropDown', auth(['proprietor', 'admin']), roleController.roleDropDown);

router.get(
  '/roleDetails/:id',
  auth(['proprietor', 'admin']),
  validate(roleValidation.roleDetails),
  roleController.roleDetails
);

router.patch(
  '/roleUpdate/:id',
  auth(['proprietor', 'admin']),
  validate(roleValidation.roleUpdate),
  roleController.roleUpdate
);

router.delete(
  '/roleDelete/:id',
  auth(['proprietor', 'admin']),
  validate(roleValidation.roleDelete),
  roleController.roleDelete
);

module.exports = router;
