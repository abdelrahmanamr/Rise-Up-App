
var express = require('express'),
  router = express.Router(),
  contentCtrl = require('../controllers/ContentController');
  suggestedContentCtrl = require('../controllers/SuggestedContentController');
  productCtrl = require('../controllers/ProductController');
  userController = require('../controllers/UserController');
  searchCtrl = require('../controllers/SearchController');
  AdminController = require('../controllers/AdminController');
  CompanyCtrl = require('../controllers/CompanyController');
  bodyParser = require('body-parser').json();


//-------------------------------Product Routes-----------------------------------
router.get('/product/getProducts', productCtrl.getProducts);
router.get('/product/getProduct/:productId', productCtrl.getProduct);
router.get('/product/getProductsBelowPrice/:price', productCtrl.getProductsBelowPrice);

router.get('/Content/viewContent/:contentId', contentCtrl.viewContent);
router.get('/Content/viewContents', contentCtrl.viewContents);
router.patch('/Content/views/:contentId', contentCtrl.views);

router.get('/User/viewUser/:userId', userController.viewUser);
router.get('/User/viewUsers', userController.viewUsers);

router.patch('/product/updateProduct/:productId', productCtrl.updateProduct);
router.delete('/product/deleteProduct/:productId', productCtrl.deleteProduct);
router.get('/Company/viewCompany/:companyId', CompanyCtrl.viewCompany);
router.get('/Company/viewCompanies', CompanyCtrl.viewCompanies);


//-------------------------------Content Routes-----------------------------------
router.post('/content/addContent', contentCtrl.createContent);
router.patch('/content/editContent/:contentId',contentCtrl.editContent);

router.post('/product/createProduct', productCtrl.createProduct);

router.delete('/Content/deleteContent/:contentId', contentCtrl.removeContent);
router.patch('/Content/updateContent/:contentId', contentCtrl.rateNew);


router.post('/Content/createComment/:contentId', contentCtrl.createComment);
router.get('/Content/getComments/:contentId',contentCtrl.getComments);


router.post('/product/createProduct', productCtrl.createProduct);
router.patch('/product/updateProduct/:productId', productCtrl.updateProduct);
router.delete('/product/deleteProduct/:productId', productCtrl.deleteProduct);


//-------------------------------SuggestedContent Routes-----------------------------------
router.post('/suggestedcontent/addSuggestedContent', suggestedContentCtrl.createSuggestedContent);
router.delete('/suggestedcontent/deleteSuggestedContent/:contentId', suggestedContentCtrl.removeSuggestedContent);
router.get('/suggestedcontent/viewSuggestedContents', suggestedContentCtrl.viewSuggestedContents);
router.get('/suggestedcontent/viewSuggestedContent/:contentId', suggestedContentCtrl.viewSuggestedContent);
router.patch('/suggestedcontent/updateSuggestedContent/:contentId', suggestedContentCtrl.updateSuggestedContent);


//-----------------------------Authentication Routes-------------------------
router.post('/user/register',userController.register);
router.post('/user/login',userController.login);
router.post('/user/checkUsername',userController.checkUsername);
router.post('/user/forgetPassword',userController.forgetPassword);
router.patch('/user/reset/:token',userController.reset);
router.patch('/user/changePassword/:userId',userController.ChangePassword);
router.get('/user/expire/:token',userController.expire);


//------------------------------Search Routes-------------------------------------
router.get('/search/getCompanyByNameOrType/:name', searchCtrl.getCompanyByNameOrType);
router.get('/search/getCompanyByName/:name',searchCtrl.getCompanyByName);
router.get('/search/getCompanyByType/:type', searchCtrl.getCompanyByType);
router.get('/search/getAllTags', searchCtrl.getAllTags);
router.post('/search/addToIndex', searchCtrl.addToIndex);
router.post('/search/addToContentIndex', searchCtrl.addToContentIndex);
router.get('/search/getTagbyKeyword/:tag', searchCtrl.getTagbyKeyword);
router.get('/search/getContentbyTitle/:title', searchCtrl.getContentbyTitle);
router.get('/search/getCompanyTags/:tags', searchCtrl.getCompanyTags);
router.get('/search/getExpertTags/:tags', searchCtrl.getExpertTags);
router.get('/search/getContentTags/:tags', searchCtrl.getContentTags);
router.get('/search/getCompanyTagsOrNameOrType/:tags', searchCtrl.getCompanyTagsOrNameOrType);
router.get('/search/getCompanyTagsOrType/:tags', searchCtrl.getCompanyTagsOrType);
router.get('/search/getCompanyTagsOrName/:tags', searchCtrl.getCompanyTagsOrName);




//-----------------------------Company Routes--------------------------------------
router.get('/company/getCompanies',CompanyCtrl.getCompanies);
router.get('/company/getCompany/:companyId',CompanyCtrl.getCompanyById);
router.post('/company/createCompany', CompanyCtrl.createCompany);
router.delete('/company/deleteCompany/:companyId', CompanyCtrl.deleteCompany);
router.patch('/company/CompanyViews/:ID', CompanyCtrl.IncrementViews);

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
router.get('/admin/getUserTags/:userId',AdminController.getTags);
router.get('/admin/viewCompanies',AdminController.viewCompanies);
router.delete('/admin/removeCompany/:companyId',AdminController.RemoveCompany);
router.patch('/admin/UpdateExpertTag/:userId',AdminController.UpdateExpertTags);

module.exports = router;
