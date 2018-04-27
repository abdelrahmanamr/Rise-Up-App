
var express = require('express'),
  router = express.Router(),
  contentCtrl = require('../controllers/ContentController');
  suggestedContentCtrl = require('../controllers/SuggestedContentController');
  suggestedCompanyCtrl = require('../controllers/SuggestedCompanyController');
  userController = require('../controllers/UserController');
  searchCtrl = require('../controllers/SearchController');
  applyExpertCtrl  = require('../controllers/ApplyExpertController');
  AdminController = require('../controllers/AdminController');
  CompanyCtrl = require('../controllers/CompanyController');
  bodyParser = require('body-parser').json();
  jwt = require('jsonwebtoken');

  var isAuthenticated = function(req, res, next) {
    // Check that the request has the JWT in the authorization header
    var token = req.headers['authorization'];
    if (!token) {
      return res.status(401).json({
        error: null,
        msg: 'You have to login first before you can access this URL.',
        data: null
      });
    }
    else{// Verify that the JWT is created using our server secret and that it hasn't expired yet
    jwt.verify(token, req.app.get('secret'), function(err, decodedToken) {
      if (err) {
        console.log(err);
        return res.status(401).json({
          error: err,
          msg: 'Login timed out, please login again.',
          data: null
        });
      }
      else{
      req.decodedToken = decodedToken;
      next();
      }
    
    });
  }
  };




router.get('/Content/viewContent/:contentId', contentCtrl.viewContent);
router.get('/Content/viewContents', contentCtrl.viewContents);
router.patch('/Content/views/:contentId', contentCtrl.views);

router.get('/User/viewUser/:userId', userController.viewUser);
router.get('/User/viewUsers', userController.viewUsers);


router.get('/Company/viewCompany/:companyId', CompanyCtrl.viewCompany);
router.get('/Company/viewCompanies', CompanyCtrl.viewCompanies);


//-------------------------------Content Routes-----------------------------------
router.post('/content/addContent',isAuthenticated,contentCtrl.createContent);
router.patch('/content/editContent/:contentId',isAuthenticated,contentCtrl.editContent);
router.put('/content/updateContent', bodyParser, contentCtrl.rate);


router.delete('/Content/deleteContent/:contentId',isAuthenticated, contentCtrl.removeContent);
router.patch('/Content/updateContent/:contentId',isAuthenticated ,contentCtrl.rateNew);


router.post('/Content/createComment/:contentId', isAuthenticated,contentCtrl.createComment);
router.get('/Content/getComments/:contentId',contentCtrl.getComments);
router.delete('/Content/deleteComment/:commentId',isAuthenticated,contentCtrl.deleteComment);
router.post('/Content/makeReport/:commentId',isAuthenticated,contentCtrl.makeReport);


router.post('/applyExpert/createApplyExpert', applyExpertCtrl.createApplyExpert);


//-------------------------------SuggestedContent Routes-----------------------------------
router.post('/suggestedcontent/addSuggestedContent', isAuthenticated,suggestedContentCtrl.createSuggestedContent);
router.delete('/suggestedcontent/deleteSuggestedContent/:contentId', isAuthenticated, suggestedContentCtrl.removeSuggestedContent);
router.get('/suggestedcontent/viewSuggestedContents', isAuthenticated, suggestedContentCtrl.viewSuggestedContents);
router.get('/suggestedcontent/viewSuggestedContent/:contentId', isAuthenticated, suggestedContentCtrl.viewSuggestedContent);
router.patch('/suggestedcontent/updateSuggestedContent/:contentId', isAuthenticated, suggestedContentCtrl.updateSuggestedContent);


//-----------------------------Authentication Routes-------------------------
router.post('/user/register',userController.register);
router.post('/user/login',userController.login);
router.post('/user/checkUsername',userController.checkUsername);
router.post('/user/forgetPassword',userController.forgetPassword);
router.patch('/user/reset/:token',userController.reset);
router.patch('/user/changePassword/:userId', isAuthenticated,userController.ChangePassword);
router.get('/user/expire/:token',userController.expire);
router.get('/user/getUserByUsername/:username',isAuthenticated,userController.getUserByUsername);
router.patch('/user/edit/:id',isAuthenticated,userController.edit);


//------------------------------Search Routes-------------------------------------
router.get('/search/getCompanyByNameOrType/:name', searchCtrl.getCompanyByNameOrType);
router.get('/search/getCompanyByName/:name',searchCtrl.getCompanyByName);
router.get('/search/getCompanyByType/:type', searchCtrl.getCompanyByType);
router.post('/search/addToUserIndex', searchCtrl.addToUserIndex);
router.post('/search/addToCompanyIndex', searchCtrl.addToCompanyIndex);
router.post('/search/addToContentIndex', searchCtrl.addToContentIndex);
router.get('/search/getContentByElasticSearch/:keyword', searchCtrl.getContentByElasticSearch);
router.get('/search/getUserByElasticSearch/:keyword',searchCtrl.getUserByElasticSearch);
router.get('/search/getCompanyByElasticSearch/:keyword',searchCtrl.getCompanyByElasticSearch);
router.get('/search/getCompanyTags/:tags', searchCtrl.getCompanyTags);
router.get('/search/getExpertTags/:tags', searchCtrl.getExpertTags);
router.get('/search/getContentTags/:tags', searchCtrl.getContentTags);
router.get('/search/getCompanyTagsOrNameOrType/:tags', searchCtrl.getCompanyTagsOrNameOrType);
router.get('/search/getCompanyTagsOrType/:tags', searchCtrl.getCompanyTagsOrType);
router.get('/search/getCompanyTagsOrName/:tags', searchCtrl.getCompanyTagsOrName);
router.get('/search/getSynonyms/:keyword',searchCtrl.getSynonyms);




//-----------------------------Company Routes--------------------------------------
router.get('/company/getCompanies',CompanyCtrl.getCompanies);
router.get('/company/getCompany/:companyId',CompanyCtrl.getCompanyById);
router.post('/company/createCompany', isAuthenticated, CompanyCtrl.createCompany);
router.delete('/company/deleteCompany/:companyId', isAuthenticated, CompanyCtrl.deleteCompany);
router.patch('/company/CompanyViews/:ID', CompanyCtrl.IncrementViews);



//---------------------------SuggestedCompany Routes------------------------------

router.post('/suggestedcompany/addSuggestedCompany',suggestedCompanyCtrl.addSuggestedCompany);


//-------------------------------Admin Routes-----------------------------------

router.patch('/admin/addExpert/:userId', isAuthenticated, AdminController.AddExpert);
router.patch('/admin/removeExpert/:userId', isAuthenticated, AdminController.RemoveExpert);
router.patch('/admin/blockUser/:userId', isAuthenticated, AdminController.BlockUser);
router.patch('/admin/unBlockUser/:userId', isAuthenticated, AdminController.UnblockUser);
router.patch('/admin/addAdmin/:userId', isAuthenticated, AdminController.AddAdmin);
router.patch('/admin/removeAdmin/:userId', isAuthenticated, AdminController.RemoveAdmin);
router.delete('/admin/removeCompany/:companyId', isAuthenticated,AdminController.removeCompany);
router.post('/admin/addCompany', isAuthenticated,AdminController.addCompany);
router.get('/admin/getCompanies', isAuthenticated,AdminController.getCompanies);
router.get('/admin/viewAllReports', isAuthenticated,AdminController.viewAllReports);
router.get('/admin/getUsers', isAuthenticated,AdminController.getUsers);
router.get('/admin/getUserById/:userId', isAuthenticated,AdminController.getUserById);
router.get('/admin/getUserTags/:userId', isAuthenticated,AdminController.getTags);
router.get('/admin/getActivityReport',AdminController.getActivityReport);
router.get('/admin/getActivityComment',AdminController.getActivityComment);
router.get('/admin/viewAllReports',AdminController.viewAllReports);
router.get('/admin/viewCompanies', isAuthenticated,AdminController.viewCompanies);
router.delete('/admin/removeCompany/:companyId', isAuthenticated,AdminController.RemoveCompany);
router.patch('/admin/UpdateExpertTag/:userId', isAuthenticated,AdminController.UpdateExpertTags);
router.delete('/admin/deleteComment/:commentId', isAuthenticated,AdminController.deleteComment);
module.exports = router;
