var express = require('express'),
  router = express.Router(),
  contentCtrl = require('../controllers/ContentController');
  productCtrl = require('../controllers/ProductController');
  userController = require('../controllers/UserController');
  searchCtrl = require('../controllers/SearchController');
  AdminController = require('../controllers/AdminController');
  CompanyCtrl = require('../controllers/CompanyController');

//-------------------------------Product Routes-----------------------------------
router.get('/product/getProducts', productCtrl.getProducts);
router.get('/product/getProduct/:productId', productCtrl.getProduct);
router.get('/product/getProductsBelowPrice/:price', productCtrl.getProductsBelowPrice);

router.get('/Content/viewContent/:contentId', contentCtrl.viewContent);
router.get('/Content/viewContents', contentCtrl.viewContents);

router.get('/User/viewUser/:userId', userController.viewUser);
router.get('/User/viewUsers', userController.viewUsers);

router.patch('/product/updateProduct/:productId', productCtrl.updateProduct);
router.delete('/product/deleteProduct/:productId', productCtrl.deleteProduct);
router.get('/Company/viewCompany/:companyId', CompanyCtrl.viewCompany);
router.get('/Company/viewCompanies', CompanyCtrl.viewCompanies);
//-------------------------------Content Routes-----------------------------------
router.post('/content/addContent', contentCtrl.createContent);

router.post('/product/createProduct', productCtrl.createProduct);
router.delete('/Content/deleteContent/:contentId', contentCtrl.removeContent);



router.patch('/product/updateProduct/:productId', productCtrl.updateProduct);

router.delete('/product/deleteProduct/:productId', productCtrl.deleteProduct);
//-----------------------------Authentication Routes-------------------------
router.post('/user/register',userController.register);
router.post('/user/login',userController.login);
router.post('/user/checkUsername',userController.checkUsername);
router.post('/user/forgetPassword',userController.forgetPassword);
router.patch('/user/reset/:token',userController.reset);
//------------------------------Search Routes-------------------------------------
router.get('/search/getCompanyByNameOrType/:name', searchCtrl.getCompanyByNameOrType);
router.get('/search/getCompanyByName/:name',searchCtrl.getCompanyByName);
router.get('/search/getCompanyByType/:type', searchCtrl.getCompanyByType);

//-----------------------------Company Routes--------------------------------------
router.get('/company/getCompanies',CompanyCtrl.getCompanies);
router.get('/company/getCompany/:companyId',CompanyCtrl.getCompanyById);
router.post('/company/createCompany', CompanyCtrl.createCompany);
router.delete('/company/deleteCompany/:companyId', CompanyCtrl.deleteCompany);

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
