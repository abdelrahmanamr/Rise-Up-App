var express = require('express'),
  router = express.Router(),
  AdminController = require('../controllers/AdminController'),
  ContentCrtl = require('../controllers/ContentController');

//-------------------------------Admin Routes-----------------------------------


router.patch('/admin/blockUser/:userId', AdminController.BlockUser);
router.delete('/admin/removeCompany/:companyId',AdminController.RemoveCompany);

//------------------------------Content Routes-----------------------------------
router.get('/content/getContent',ContentCrtl.getContents);

module.exports = router;

