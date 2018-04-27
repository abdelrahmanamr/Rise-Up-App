var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
 SuggestedCompany = mongoose.model('SuggestedCompany');
  

  module.exports.addSuggestedCompany = function(req, res, next) {

    console.log(req.body);
  var valid =

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

  User.findById(req.body.userid).exec(function(err,user) {
      if(err){
        return next(err);
      }
      else {
        if(!user){
        return res
        .status(404)
        .json({ err: null, msg: 'User not found,so you are un-authorized', data: null });
      }else{
  // Security Check
  delete req.body.createdAt;
  delete req.body.updatedAt;

  SuggestedCompany.create(req.body, function(err, suggestedCompany) {
      if (err) {
          return res.status(422).json({
          err: null,
          msg: 'Failed',
          data: suggestedCompany
      });
      }
      return res.status(201).json({
          err: null,
          msg: 'Company was suggested successfully.',
          data: suggestedCompany
      });
  });
};
      }
    }
);
}
