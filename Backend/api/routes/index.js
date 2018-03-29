var express = require('express'),
  router = express.Router(),
  AdminController = require('../controllers/AdminController');

//-------------------------------Admin Routes-----------------------------------


router.patch('/admin/blockUser/:userId', AdminController.BlockUser);

router.post('/admin/addCompany',AdminController.AddCompany);
router.get('/admin/viewCompanies',AdminController.viewCompanies);

module.exports = router;

