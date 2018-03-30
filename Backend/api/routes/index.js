var express = require('express'),
  router = express.Router(),
  contentCtrl = require('../controllers/ContentController');
  productCtrl = require('../controllers/ProductController');
  userController = require('../controllers/UserController');
  searchCtrl = require('../controllers/SearchController');
  companyCtrl = require('../controllers/CompanyController');
  AdminController = require('../controllers/AdminController');


//-------------------------------Product Routes-----------------------------------
router.get('/product/getProducts', productCtrl.getProducts);
router.get('/product/getProduct/:productId', productCtrl.getProduct);
router.get(
  '/product/getProductsBelowPrice/:price',
  productCtrl.getProductsBelowPrice
);
router.post('/product/createProduct', productCtrl.createProduct);

router.patch('/product/updateProduct/:productId', productCtrl.updateProduct);
router.delete('/product/deleteProduct/:productId', productCtrl.deleteProduct);

//-------------------------------Content Routes-----------------------------------
router.post('/content/addContent', contentCtrl.createContent);


//-----------------------------Authentication Routes-------------------------
router.post('/user/register',userController.register);
router.post('/user/login',userController.login);
router.post('/user/checkUsername',userController.checkUsername);

//------------------------------Search Routes-------------------------------------
router.get('/search/getCompanyByName/:name',searchCtrl.getCompanyByName);
router.get('/search/getCompanyByType/:type', searchCtrl.getCompanyByType);

//-----------------------------Company Routes--------------------------------------
router.get('/company/getCompanies',companyCtrl.getCompanies);
router.get('/company/getCompany/:companyId',companyCtrl.getCompanyById);
router.post('/company/createCompany', companyCtrl.createCompany);
router.delete('/company/deleteCompany/:companyId', companyCtrl.deleteCompany);

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
