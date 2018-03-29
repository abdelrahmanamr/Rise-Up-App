var express = require('express'),
  router = express.Router(),
  contentCtrl = require('../controllers/ContentController');
  productCtrl = require('../controllers/ProductController');
  contentCtrl = require('../controllers/ContentController');
  userController = require('../controllers/UserController');

//-------------------------------Product Routes-----------------------------------
router.get('/product/getProducts', productCtrl.getProducts);
router.get('/product/getProduct/:productId', productCtrl.getProduct);
router.get('/product/getProductsBelowPrice/:price', productCtrl.getProductsBelowPrice);

router.get('/Content/viewContent/:contentId', contentCtrl.viewContent);
router.get('/Content/viewContents', contentCtrl.viewContents);

router.post('/content/addContent', contentCtrl.createContent);

router.post('/product/createProduct', productCtrl.createProduct);


router.patch('/product/updateProduct/:productId', productCtrl.updateProduct);

router.delete('/product/deleteProduct/:productId', productCtrl.deleteProduct);
//-----------------------------Authentication Routes-------------------------
router.post('/user/register',userController.register);
router.post('/user/login',userController.login);
router.post('/user/checkUsername',userController.checkUsername);

module.exports = router;
