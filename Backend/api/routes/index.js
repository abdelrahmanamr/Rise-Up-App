var express = require('express'),
  router = express.Router(),
  contentCtrl = require('../controllers/ContentController');
  productCtrl = require('../controllers/ProductController');
  userController = require('../controllers/UserController');
  searchCtrl = require('../controllers/SearchController');
  companyCtrl = require('../controllers/CompanyController');

//-------------------------------Product Routes-----------------------------------
router.get('/product/getProducts', productCtrl.getProducts);
router.get('/product/getProduct/:productId', productCtrl.getProduct);
router.get(
  '/product/getProductsBelowPrice/:price',
  productCtrl.getProductsBelowPrice
);
router.post('/product/createProduct', productCtrl.createProduct);

//-------------------------------Content Routes-----------------------------------
router.post('/content/addContent', contentCtrl.createContent);


router.patch('/product/updateProduct/:productId', productCtrl.updateProduct);
router.delete('/product/deleteProduct/:productId', productCtrl.deleteProduct);
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


module.exports = router;
