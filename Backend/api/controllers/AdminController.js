var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  Company = mongoose.model('Company');


  module.exports.AddCompany = function(req, res, next) {
    var valid =
        req.body.userid &&
        Validations.isObjectId(req.body.userid) &&
        req.body.name &&
        Validations.isString(req.body.name) &&
        req.body.email &&
        Validations.isString(req.body.email) &&
        req.body.website &&
        Validations.isString(req.body.website)&&
        req.body.tags &&
        Validations.isString(req.body.tags)&&
        req.body.type &&
        Validations.isString(req.body.type)
    ;
    if (!valid) {
        return res.status(422).json({
            err: null,
            msg: 'name(String) , email(String) , website(String) , tags(String) and type(String) are required fields.',
            data: null
        });
    }
    // Security Check
    delete req.body.createdAt;
    delete req.body.updatedAt;

    Company.create(req.body, function(err, company) {
        if (err) {
            return next(err);
        }
        res.status(201).json({
            err: null,
            msg: 'Company was created successfully.',
            data: company
        });
    });
};

module.exports.viewCompanies = function(req, res, next) {
    Product.find({}).exec(function(err, company) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg: 'Companies retrieved successfully.',
        data: company
      });
    });
  };
  

  
  module.exports.BlockUser=function(req, res, next){

    if(!Validations.isObjectId(req.params.userId)){
        return res.status(422).json({
            err: null,
            msg: 'userId parameter must be a valid ObjectId',
            data: null
        });
    }

    var valid=req.body.blocked &&
    Validations.isBoolean(req.body.block);

    if(valid){
        return res.status(422).json({
            err:null,
            msg:'blocked (Boolean) is required field. ',
            data:null
        });
    }

    delete req.body.createdAt;
    req.body.updatedAt = moment().toDate();

    req.body.blocked=true;

    User.findByIdAndUpdate(
        req.params.userId,
        {
            $set:req.body
        },
        {
            new:true
        }
    ).exec(function(err, updatedUser){
        if(err){
            return next(err);
        }
        if(!updatedUser){
            return res.status(404).json({
                err:null,
                msg:'User not found',
                data:null
            });
        }

        res.status(200).json({
            err:null,
            msg:'User retrieved correctly',
            data:updatedUser
        });
    });
};


module.exports.RemoveCompany = function(req, res, next) {
  if (!Validations.isObjectId(req.params.companyId)) {
      return res.status(422).json({
          err: null,
          msg: 'CompanyId parameter must be a valid ObjectId.',
          data: null
      });
  }
  Company.findByIdAndRemove(req.params.companyId).exec(function(
      err,
      deletedCompany
  ) {
      if (err) {
          return next(err);
      }
      if (!deletedCompany) {
          return res
              .status(404)
              .json({ err: null, msg: 'Company not found.', data: null });
      }
      res.status(200).json({
          err: null,
          msg: 'Company was deleted successfully.',
          data: deletedCompany
      });
  });
};
 