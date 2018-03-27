var express = require('express'),
  router = express.Router(),
  productCtrl = require('../controllers/ProductController');
  contentCtrl = require('../controllers/ContentController');
//-------------------------------Product Routes-----------------------------------
router.get('/product/getProducts', productCtrl.getProducts);
router.get('/product/getProduct/:productId', productCtrl.getProduct);
router.get('/product/getProductsBelowPrice/:price', productCtrl.getProductsBelowPrice);

router.get('/content/viewContent:contentId', contentCtrl.viewContent);
router.get('/content/viewContents', contentCtrl.viewContents);

router.post('/product/createProduct', productCtrl.createProduct);

router.patch('/product/updateProduct/:productId', productCtrl.updateProduct);

router.delete('/product/deleteProduct/:productId', productCtrl.deleteProduct);

module.exports = router;
