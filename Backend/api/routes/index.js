var express = require('express'),
  router = express.Router(),
  AdminController = require('../controllers/AdminController');

//-------------------------------Admin Routes-----------------------------------

router.patch('/admin/addExpert/:userId', AdminController.AddExpert);
router.patch('/admin/removeExpert/:userId', AdminController.RemoveExpert);
router.patch('/admin/blockUser/:userId', AdminController.BlockUser);
router.patch('/admin/unBlockUser/:userId', AdminController.UnblockUser);
router.patch('/admin/addAdmin/:userId', AdminController.AddAdmin);
router.patch('/admin/removeAdmin/:userId', AdminController.RemoveAdmin);
router.delete('/admin/removeCompany/:companyId',AdminController.removeCompany);
router.post('/admin/addCompany',AdminController.addCompany);
router.get('/admin/getCompanies',AdminController.getCompanies);
router.get('/admin/getUsers',AdminController.getUsers);
router.get('/admin/getUserById/:userId',AdminController.getUserById);
router.get('/admin/viewCompanies',AdminController.viewCompanies);
router.delete('/admin/removeCompany/:companyId',AdminController.RemoveCompany);
module.exports = router;
