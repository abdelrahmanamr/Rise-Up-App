var express = require('express'),
  router = express.Router(),
  AdminController = require('../controllers/AdminController'),
  ContentCrtl = require('../controllers/ContentController');

//-------------------------------Admin Routes-----------------------------------


router.patch('/admin/blockUser/:userId', AdminController.BlockUser);

//------------------------------Content Routes-----------------------------------
router.get('/content/getContent',ContentCrtl.getContents);

module.exports = router;

