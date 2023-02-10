//Internal Lib Import
const express = require('express');

//External Lib Import
const { auth, accessPermission } = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const memberValidation = require('../../validations/member.validation');
const memberController = require('../../controllers/member.controller');

const router = express.Router();

router.post(
  '/memberCreate',
  auth(['proprietor', 'admin']),
  accessPermission('memberCreate'),
  validate(memberValidation.memberCreate),
  memberController.memberCreate
);

router.get('/memberList', auth(['proprietor', 'admin']), memberController.memberList);
router.get('/memberdropDown', auth(['proprietor', 'admin']), memberController.memberDropDown);

router.get(
  '/memberDetails/:id',
  auth(['proprietor', 'admin']),
  validate(memberValidation.memberDetails),
  memberController.memberDetails
);

router.patch(
  '/memberUpdate/:id',
  auth(['proprietor', 'admin']),
  validate(memberValidation.memberUpdate),
  memberController.memberUpdate
);

router.delete(
  '/memberDelete/:id',
  auth(['proprietor', 'admin']),
  validate(memberValidation.memberDelete),
  memberController.memberDelete
);

module.exports = router;
