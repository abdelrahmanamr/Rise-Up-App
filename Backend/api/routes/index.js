var express = require('express'),
  router = express.Router(),
  AdminController = require('../controllers/AdminController');

//-------------------------------Admin Routes-----------------------------------
router.get('/admin/removeCompany', AdminController.removeCompany);



module.exports = router;

