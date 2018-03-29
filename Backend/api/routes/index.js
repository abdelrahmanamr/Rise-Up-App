var express = require('express'),
  router = express.Router(),
  AdminController = require('../controllers/AdminController');

//-------------------------------Admin Routes-----------------------------------


router.patch('/admin/blockUser/:userId', AdminController.BlockUser);
router.delete('/admin/removeCompany/:companyId',AdminController.RemoveCompany);

module.exports = router;

