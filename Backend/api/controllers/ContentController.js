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
  

  module.exports.viewContents = function(req, res, next) {
    Content.find({}).exec(function(err, contents) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg: 'contents retrieved successfully.',
        data: contents
      });
    });
  };


  module.exports.viewContent = function(req, res, next) {
    if (!Validations.isObjectId(req.params.contentId)) {
      return res.status(422).json({
        err: null,
        msg: 'contentId parameter must be a valid ObjectId.',
        data: null
      });
    }
    Content.findById(req.params.contentId).exec(function(err, content) {
      if (err) {
        return next(err);
      }
      if (!content) {
        return res
          .status(404)
          .json({ err: null, msg: 'content not found.', data: null });
      }
      res.status(200).json({
        err: null,
        msg: 'content retrieved successfully.',
        data: content
      });
    });
  };