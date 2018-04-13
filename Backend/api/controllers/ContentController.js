var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  Content = mongoose.model('Content');
  Comment = mongoose.model('Comment');
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

module.exports.editContent = function(req, res, next) {
  if (!Validations.isObjectId(req.params.contentId)) {
    return res.status(422).json({
      err: null,
      msg: 'contentId parameter must be a valid ObjectId.',
      data: null
    });
  }
  // var valid = 
  //  req.body.title &&
  //  Validations.isString(req.body.title)&&
  //  req.body.body &&
  //  Validations.isString(req.body.body) &&
  //  req.body.userid &&
  //  Validations.isObjectId(req.body.userid)&&
  //  req.body.tags &&
  //  Validations.isString(req.body.tags);
  // if (!valid){
  //   return res.status(422).json({
  //     err: null,
  //     msg: 'title(String), body(String) and tags(String) are required fields.',
  //     data: null
  //   });
  // }

  delete req.body.createdAt;
  req.body.updatedAt = moment().toDate();
 
  Content.findByIdAndUpdate(
    req.params.contentId,
    
    {
      $set: req.body
    },
    { new: true }
  ).exec(function(err, updateContent) {
    if (err) {
      return next(err);
    }
    if (!updateContent) {
      return res
        .status(404)
        .json({ err: null, msg: 'content not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'content retrieved successfully.',
      data: updateContent
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


module.exports.updaterate = function(req, res, next) {
  if (!Validations.isObjectId(req.params.contentId)) {
    return res.status(422).json({
      err: null,
      msg: 'productId parameter must be a valid ObjectId.',
      data: null
    });
  }
  var valid =
    req.body.rating &&
    Validations.isNumber(req.body.rating);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name(String) and price(Number) are required fields.',
      data: null
    });
  }
  
Content.findById(req.params.contentId).exec(function(err, ratedContents){

  ratedContents.ratingarray.push(req.body.rating);
   var allratings=0;
  length=0
   ratedContents.ratingarray.forEach(ratedContent => {
     allratings = ratedContent+allratings;
    length++;
   });
   req.body.rating=allratings/length;
   ratedContents.rating = req.body.rating;
   ratedContents.save(function(err,ratedContents,num){
     if(err){
       return next(err);
     }else{
       if(num==0){
        return   res.status(422).json({
          err: null,
          msg: 'Failure in update',
          data: null
        });
       }else{
        return   res.status(201).json({
          err: null,
          msg: 'updated',
          data: ratedContents
        });
       }
     }
   });

 });
 
};





module.exports.rateNew = function(req,res,next){
  if (!Validations.isObjectId(req.params.contentId)) {
    return res.status(422).json({
      err: null,
      msg: 'contentId parameter must be a valid ObjectId.',
      data: null
    });
  }
  var valid =
  req.body.rating &&
  Validations.isNumber(req.body.rating) && req.body.userid && Validations.isObjectId(req.body.userid);
if (!valid) {
  return res.status(422).json({
    err: null,
    msg: 'name(String) and price(Number) are required fields.',
    data: null
  });
}else{
  Rating.findOne({userid: req.body.userid,
    contentid: req.params.contentId
  }).exec(function(err, ratingFound) {
    if (err) {
      return next(err);
    }
    else{
      if(ratingFound){
        console.log("update")
        ratingFound.rating = req.body.rating;
        ratingFound.updatedAt = Date.now();
        console.log("here")
        ratingFound.save(function(err,ratingFound,num){
            if(err){
              return res.status(422).json({
                err: err,
                msg: 'Error updating existing entry in database',
                data: null
              });
            }
            else{
              console.log(num)
              if(num==0){
                return res.status(422).json({
                  err: null,
                  msg: 'No change in database',
                  data: null
                });
              }
              else {
                console.log("akhr update");
                Rating.find({
                  contentid: req.params.contentId
                }).exec(function(err, AllRatings) {
                  if (err) {
                    return next(err);
                  }
                  else{
                    var totalRatings = 0;
            AllRatings.forEach(EachRating => {
              totalRatings += EachRating.rating
            });
            avgRating = totalRatings/AllRatings.length;
            console.log(avgRating);
            Content.findByIdAndUpdate(req.params.contentId,{ $set: { rating: avgRating }}).exec(function(err,content){
              if(err){
                return res.status(422).json({
                  err: null,
                  msg: 'Error updating content rating',
                  data: null
                });
              }else if(content){
                return res.status(201).json({
                  err: null,
                  msg: 'Content rating updated and all done',
                  data: content
                });
              }
            });
                  }
                });
                
              }
            }
        });
      }else{
        console.log("create")
        Rating.create({
          contentid: req.params.contentId,
          userid: req.body.userid,
          rating: req.body.rating,
          createdAt: Date.now(),
        }, function(err, rating) {
          if (err) {
            console.log(req.body);
            return next(err);
          }else{
            Rating.find({
              contentid: req.params.contentId
            }).exec(function(err, AllRatings) {
              if (err) {
                return next(err);
              }
              else{
                var totalRatings = 0;
        AllRatings.forEach(EachRating => {
          totalRatings += EachRating.rating
        });
        avgRating = totalRatings/AllRatings.length;
        Content.findByIdAndUpdate(req.params.contentId,{ $set: { rating: avgRating }}).exec(function(err,content){
          if(err){
            return res.status(422).json({
              err: null,
              msg: 'Error updating content rating',
              data: null
            });
          }else if(content){
            return res.status(201).json({
              err: null,
              msg: 'Content rating updated and all done',
              data: content
            });
          }
        });
              }
            });
          }
      });
      
    }
  };
});
}
}




module.exports.createComment = function(req, res, next) {
  
  var valid = req.params.contentId && 
  Validations.isObjectId(req.params.contentId) && 
  req.body.body &&  
  Validations.isString(req.body.body) && 
  req.body.userid && 
  Validations.isObjectId(req.body.userid);

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'body(String) and userid(ObjectId) and contentid are required fields.',
      data: null
    });
  }else{
  

  Comment.create(req.body, function(err, comments) {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      err: null,
      msg: 'Comment was created successfully.',
      data: comments
    });
  });
}}






module.exports.getComments = function(req, res, next) {
  if (!Validations.isObjectId(req.params.contentId)) {
    return res.status(422).json({
      err: null,
      msg: 'contentId parameter must be a valid ObjectId.',
      data: null
    });
  }
  Comment.find({contentid:req.params.contentId}).exec(function(err, comments) {
    console.log(req.body.contentId)
    if (err) {
      return next(err);
    }
    if (!comments) {
      return res
        .status(404)
        .json({ err: null, msg: 'no comments are found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'content retrieved successfully.',
      data: comments
    });
  });
};













