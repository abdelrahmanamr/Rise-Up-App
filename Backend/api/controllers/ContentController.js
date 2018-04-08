var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  Content = mongoose.model('Content');
  User = mongoose.model('User');
  Rating = mongoose.model('Rating');


  module.exports.views = function(req, res, next) {
    if (!Validations.isObjectId(req.params.contentId)) {
      return res.status(422).json({
        err: null,
        msg: 'contentId parameter must be a valid ObjectId.',
        data: null
      });
    }
  
    Content.findByIdAndUpdate(
      req.params.contentId,
      {
        $inc: {views : 1}
      },
      { new: true }
   
    ).exec(function(err, updatedcontent) {
      console.log("req.params.views")
      if (err) {
        return next(err);
      }
      if (!updatedcontent) {
        return res
          .status(404)
          .json({ err: null, msg: 'content not found.', data: null });
      }
      res.status(200).json({
        err: null,
        msg: 'content was updated successfully.',
        data: updatedcontent
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

  module.exports.rate = function (req, res, next) {
    Rating.findOne({
      userid: req.body.userid,
      contentid: req.body.contentid
    }).exec(function(err, rating) {
      if (err) {
        return next(err);
      }
      if(rating){
        Rating.findByIdAndUpdate(
          rating._id,
          {
            rating: req.body.rating,
            updatedAt: Date.now()
          },
          { new: true }
        ).exec(function(err, updatedRating) {
          if (err) {
            return next(err);
          }
          if (!updatedRating) {
            return res
              .status(404)
              .json({ err: null, msg: 'Rating not found.', data: null });
          }

          Rating.find({
            contentid: req.body.contentid
          }, { rating: 1 }).exec(function(err, ratings) {
            if (err) {
              return next(err);
            }
            var totalRatings = 0;
            ratings.forEach(rating => {
              totalRatings += rating.rating
            });
            avgRating = totalRatings/ratings.length;

            Content.findByIdAndUpdate(
              req.body.contentid,
              {
                rating: avgRating,
                updatedAt: Date.now()
              },
              { new: true }
            ).exec(function(err, updatedContent) {
              if (err) {
                return next(err);
              }
              if (!updatedContent) {
                return res
                  .status(404)
                  .json({ err: null, msg: 'Content not found.', data: null });
              }
              res.status(200).json({
                err: null,
                msg: 'Content was updated successfully.',
                data: updatedContent
              });
            });

          });
          
        });
      }else{
        Rating.create({
          contentid: req.body.contentid,
          userid: req.body.userid,
          rating: req.body.rating,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }, function(err, rating) {
          if (err) {
            console.log(req.body);
            return next(err);
          }

          Rating.find({
            contentid: req.body.contentid
          }, { rating: 1 }).exec(function(err, ratings) {
            if (err) {
              return next(err);
            }
            var totalRatings = 0;
            ratings.forEach(rating => {
              totalRatings += rating.rating
            });
            avgRating = totalRatings/ratings.length;

            Content.findByIdAndUpdate(
              req.body.contentid,
              {
                rating: req.body.rating,
                updatedAt: Date.now()
              },
              { new: true }
            ).exec(function(err, updatedContent) {
              if (err) {
                return next(err);
              }
              if (!updatedContent) {
                return res
                  .status(404)
                  .json({ err: null, msg: 'Content not found.', data: null });
              }
              res.status(200).json({
                err: null,
                msg: 'Content was updated successfully.',
                data: updatedContent
              });
            });

          });
          
        });
      }
      
    });
  }
  
  module.exports.removeContent = function(req, res, next) {
    if (!Validations.isObjectId(req.params.contentId)) {
        return res.status(422).json({
            err: null,
            msg: 'ContentId parameter must be a valid ObjectId.',
            data: null
        });
    }
    Content.findByIdAndRemove(req.params.contentId).exec(function(
        err,
        deletedContent
    ) {
        if (err) {
            return next(err);
        }
        if (!deletedContent) {
            return res
                .status(404)
                .json({ err: null, msg: 'Content not found.', data: null });
        }
        res.status(200).json({
            err: null,
            msg: 'Content was deleted successfully.',
            data: deletedContent
        });
    });
};


  module.exports.createContent = function(req, res, next) {
    var valid =
      req.body.title &&
      Validations.isString(req.body.title) &&
      req.body.body &&
      Validations.isString(req.body.body) &&
      req.body.userid &&
      Validations.isObjectId(req.body.userid)&&
      req.body.tags &&
      Validations.isString(req.body.tags)
      ;
    if (!valid) {
      return res.status(422).json({
        err: null,
        msg: 'title(String) and body(String) and tags are required fields.',
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
