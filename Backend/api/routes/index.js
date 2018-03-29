var express = require('express'),
  router = express.Router(),
  AdminController = require('../controllers/AdminController');

//-------------------------------Admin Routes-----------------------------------

router.get('/companies/viewCompanies', AdminController.viewCompanies);
router.post('/companies/addCompany', AdminController.addCompany);



module.exports = router;

