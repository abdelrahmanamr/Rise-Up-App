var express = require('express'),
  router = express.Router(),
  AdminController = require('../controllers/AdminController');

//-------------------------------Admin Routes-----------------------------------


router.patch('/admin/blockUser/:userId', AdminController.BlockUser);


module.exports = router;

