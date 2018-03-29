var express = require('express'),
  router = express.Router(),
  AdminController = require('../controllers/AdminController'),
  ContentCrtl = require('../controllers/ContentController');

//-------------------------------Admin Routes-----------------------------------


router.patch('/admin/blockUser/:userId', AdminController.BlockUser);
router.delete('/admin/removeCompany/:companyId',AdminController.RemoveCompany);





router.post('/admin/addCompany',AdminController.AddCompany);
router.get('/admin/viewCompanies',AdminController.viewCompanies);







//------------------------------Content Routes-----------------------------------
router.get('/content/getContents',ContentCrtl.getContents);
router.delete('/content/deleteContent',ContentCrtl.DeleteContent);
module.exports = router;
