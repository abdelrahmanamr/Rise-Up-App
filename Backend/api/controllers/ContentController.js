var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  Content = mongoose.model('Content');

  module.exports.createContent = function(req, res, next) {
    var valid =
      req.body.title &&
      Validations.isString(req.body.title) &&
      req.body.body &&
      Validations.isString(req.body.body);
    if (!valid) {
      return res.status(422).json({
        err: null,
        msg: 'title(String) and body(String) are required fields.',
        data: null
      });
    }
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
  };