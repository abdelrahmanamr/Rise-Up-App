var express = require('express'),
  router = express.Router(),
  productCtrl = require('../controllers/ProductController'),
  contentCtrl = require('../controllers/ContentController');


//-------------------------------Product Routes-----------------------------------
router.get('/product/getProducts', productCtrl.getProducts);
router.get('/product/getProduct/:productId', productCtrl.getProduct);
router.get(
  '/product/getProductsBelowPrice/:price',
  productCtrl.getProductsBelowPrice
);
router.post('/product/createProduct', productCtrl.createProduct);


router.post('/content/addContent', contentCtrl.createContent);


router.patch('/product/updateProduct/:productId', productCtrl.updateProduct);
router.delete('/product/deleteProduct/:productId', productCtrl.deleteProduct);

module.exports = router;
