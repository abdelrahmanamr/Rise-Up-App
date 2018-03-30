var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  Content = mongoose.model('Content'),
  User = mongoose.model('User');

  module.exports.createContent = function(req, res, next) {
    var valid =
      req.body.title &&
      Validations.isString(req.body.title) &&
      req.body.body &&
      Validations.isString(req.body.body) &&
      req.body.userid &&
      Validations.isObjectId(req.body.userid);
    if (!valid) {
      return res.status(422).json({
        err: null,
        msg: 'title(String) and body(String) are required fields.',
        data: null
      });
    }else{
    User.findById(req.body.userid).exec(function(err,user) {
      if(err){
        return next(err);
      }
      else {if(!user){
        return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
      }else{
      if(!user['admin']){
        return res.status(422).json({
          err: null,
          msg: 'Unauthorized! You are not an admin.',
          data: null
        });
      }else{
    

    // Security Check
    delete req.body.createdAt;
    delete req.body.updatedAt;
  
    Content.create(req.body, function(err, content) {
      if (err) {
        return next(err);
      }
      res.status(201).json({
        err: null,
        msg: 'Content was created successfully.',
        data: content
      });
    });
  }}}});
}}
