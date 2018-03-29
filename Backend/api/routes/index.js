var express = require('express'),
  router = express.Router(),
  contentCtrl = require('../controllers/ContentController');

//-------------------------------Content Routes-----------------------------------
router.post('/content/postLink', contentCtrl.postLink);


module.exports = router;
