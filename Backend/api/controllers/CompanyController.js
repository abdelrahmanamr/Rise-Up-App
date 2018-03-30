var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  Company = mongoose.model('Company');

  

  module.exports.viewCompanies = function(req, res, next) {
    Company.find({}).exec(function(err, Companys) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg: 'Companys retrieved successfully.',
        data: Companys
      });
    });
  };


  module.exports.viewCompany = function(req, res, next) {
    if (!Validations.isObjectId(req.params.CompanyId)) {
      return res.status(422).json({
        err: null,
        msg: 'CompanyId parameter must be a valid ObjectId.',
        data: null
      });
    }
    Company.findById(req.params.CompanyId).exec(function(err, Company) {
      if (err) {
        return next(err);
      }
      if (!Company) {
        return res
          .status(404)
          .json({ err: null, msg: 'Company not found.', data: null });
      }
      res.status(200).json({
        err: null,
        msg: 'Company retrieved successfully.',
        data: Company
      });
    });
  };