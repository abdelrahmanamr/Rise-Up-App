var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  Company = mongoose.model('Company');



  module.exports.viewCompanies = function(req, res, next) {
    Company.find({}).exec(function(err, companies) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg: 'Companies retrieved successfully.',
        data: companies
      });
    });
  };
  
//missing
  module.exports.addCompany = function(req, res, next) {
    
    Company.addCompany(req.body, function(err, companies) {
      if (err) {
        return next(err);
      }
      res.status(201).json({
        err: null,
        msg: 'Company was created successfully.',
        data: companies
      });
    });
  };