var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  Company = mongoose.model('Company');



  
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
 