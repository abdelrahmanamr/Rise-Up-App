var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  User = mongoose.model('User'),
 Company = mongoose.model('Company'),
Content = mongoose.model('Content'),
    Report = mongoose.model('Report'),
Comment = mongoose.model('Comment');
ApplyExpert =mongoose.model('ApplyExpert');


module.exports.AddExpert=function(req, res, next){ // Gives a user an expert status after checking tat the user making the request is an admin
    if(!Validations.isObjectId(req.params.userId)){
        return res.status(422).json({
            err: null,
            msg: 'userId parameter must be a valid ObjectId',
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
        if(!user['admin']){
          return res.status(422).json({
            err: null,
            msg: 'Unauthorized! You are not an admin.',
            data: null
          });
        }else{
    delete req.body.createdAt;
    req.body.updatedAt = moment().toDate();

    req.body.expert=true;

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

else{
    ApplyExpert.findOne({userid:req.params.userId}).exec(function(err,userfound){
if(err){
    return next(err)
}
else if(userfound){
   ApplyExpert.findByIdAndRemove(userfound["_id"]).exec(function(err,removed){
       if(err){

    return   res.status(422).json({
            err:err,
            msg:'Error removing',
            data:null
        });
       }
       else{
        res.status(200).json({
            err:null,
            msg:'User removed correctly',
            data:null
        });
       }
   });
}
else if(!userfound){
    res.status(200).json({
        err:null,
        msg:'User retrieved correctly',
        data:updatedUser
    });
}

    })
       }
    });
};
        }
    }
});
}


module.exports.RemoveRequest=function(req,res,next){   //this method remove the request of a user who applied to be an expert
    if(!Validations.isObjectId(req.params.userId)){
        return res.status(422).json({
            err: null,
            msg: 'userId parameter must be a valid ObjectId',
            data: null
        });
    }
    ApplyExpert.findOne({userid:req.params.userId}).exec(function(err,userfound){
        if(err){
            return next(err)
        }
        else if(userfound){
           ApplyExpert.findByIdAndRemove(userfound["_id"]).exec(function(err,removed){
               if(err){
        
            return   res.status(422).json({
                    err:err,
                    msg:'Error removing',
                    data:null
                });
               }
               else{
                res.status(200).json({
                    err:null,
                    msg:'User removed correctly',
                    data:null
                });
               }
           });
        }});
}


module.exports.getActivityComment=function(req,res,next){ // Returns all user activity(comments) after checking that the user making this request is an admin
    req.body.userid = req["headers"]["id"];
User.findById(req.body.userid).exec(function(err,user){
    if(err){
        return next(err)
    }else{
        if(!user){
            return res.status(422).json({
                err: null,
                msg: 'Admin not found.',
                data: null
            });
        }
        if(user["admin"]){
    var queryDate = new Date();
    queryDate.setDate(queryDate.getDate()-7);
    Comment.find( {"createdAt":{$gt: queryDate}}).exec(function(err, comments) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            err: null,
            msg: 'comments retrieved successfully.',
            data: comments
        });
    });
}
else{
    return res.status(422).json({
        err: null,
        msg: 'Not an admin',
        data: null
    });
}
    }
});

}
module.exports.getActivityReport=function(req,res,next){ // Returns all user activity(reports) after checking that the user making this request is an admin
    req.body.userid = req["headers"]["id"];
    User.findById(req.body.userid).exec(function(err,user){
        if(err){
            return next(err)
        }else{
            if(!user){
                return res.status(422).json({
                    err: null,
                    msg: 'Admin not found.',
                    data: null
                });
            }
            if(user["admin"]){
    var queryDate = new Date();
    queryDate.setDate(queryDate.getDate()-7);
    Report.find( {"createdAt":{$gt: queryDate}}).exec(function(err, reports) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            err: null,
            msg: 'Reports retrieved successfully.',
            data: reports
        });
    });
}
else{
    return res.status(422).json({
        err: null,
        msg: 'Not an admin',
        data: null
    });
        }
    }
    });

}

module.exports.deleteComment=function(req,res,next){  
    if (!Validations.isObjectId(req.params.commentId)) {
        return res.status(422).json({
            err: null,
            msg: 'commentId parameter must be a valid ObjectId.',
            data: null
        });
    }else {

        Comment.findByIdAndRemove(req.params.commentId).exec(function (err, removed) {
            if (err) {
                return res.status(422).json({
                    err: null,
                    msg: "Can't remove comment right now1",
                    data: null
                });
            } else {
                if (!removed) {
                    return res.status(422).json({
                        err: err,
                        msg: "Can't remove comment right now2",
                        data: null
                    });
                }
                if (removed) {
                    Report.remove({commentId:req.params.commentId},function(err){
                        if(err){
                            return res.status(422).json({
                                err: err,
                                msg: "Can't remove comment right now2",
                                data: null
                            });
                        }
                        else{
                            return res.status(201).json({
                                err: null,
                                msg: "Done",
                                data: null
                            });
                        }
                    });
                }
            }
        });

 



    }
}

module.exports.UpdateExpertTags=function(req, res, next){ // Changes the tags of an existing expert after checking user making this request is an admin

    if(!Validations.isObjectId(req.params.userId)){
        return res.status(422).json({
            err: null,
            msg: 'userId parameter must be a valid ObjectId',
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
        if(!user['admin']){
          return res.status(422).json({
            err: null,
            msg: 'Unauthorized! You are not an admin.',
            data: null
          });
        }else{

    delete req.body.createdAt;
    req.body.updatedAt = moment().toDate();

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
        }
    }
});
}
module.exports.BlockUser=function(req, res, next){ // Blocks the user from logging in again, checks input ID and user is an admin then block


    if(!Validations.isObjectId(req.params.userId)){
        return res.status(422).json({
            err: null,
            msg: 'userId parameter must be a valid ObjectId',
            data: null
        });
    }
    console.log("REQ BODY USERID: " + req.body.userid);
    User.findById(req.body.userid).exec(function(err,user) {
        if(err){
          return next(err);
        }
        else {
            
            
          if(!user){
              console.log("ASD");
          return res
          .status(404)
          .json({ err: null, msg: 'User not found,so you are un-authorizedA', data: null });
        }else{
        if(!user['admin']){
          return res.status(422).json({
            err: null,
            msg: 'Unauthorized! You are not an admin.',
            data: null
          });
        }else{
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
        }
    }
});
}


module.exports.AddAdmin=function(req, res, next){ // Gives the user all available admin rights  after checking that the user making this request is an admin


    if(!Validations.isObjectId(req.params.userId)){
        return res.status(422).json({
            err: null,
            msg: 'userId parameter must be a valid ObjectId',
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
        if(!user['admin']){
          return res.status(422).json({
            err: null,
            msg: 'Unauthorized! You are not an admin.',
            data: null
          });
        }else{
    delete req.body.createdAt;
    req.body.updatedAt = moment().toDate();

    req.body.admin=true;

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
        }
    }
});
}


module.exports.RemoveExpert=function(req, res, next){ // Removes the expert status from a user after checking that the user making this request is an admin

    if(!Validations.isObjectId(req.params.userId)){
        return res.status(422).json({
            err: null,
            msg: 'userId parameter must be a valid ObjectId',
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
        if(!user['admin']){
          return res.status(422).json({
            err: null,
            msg: 'Unauthorized! You are not an admin.',
            data: null
          });
        }else{
    delete req.body.createdAt;
    req.body.updatedAt = moment().toDate();

    req.body.expert=false;

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
        }
    }
});
}

module.exports.UnblockUser=function(req, res, next){  // Allow a user to login once more onto the website after checking that the user making this request is an admin

    if(!Validations.isObjectId(req.params.userId)){
        return res.status(422).json({
            err: null,
            msg: 'userId parameter must be a valid ObjectId',
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
        if(!user['admin']){
          return res.status(422).json({
            err: null,
            msg: 'Unauthorized! You are not an admin.',
            data: null
          });
        }else{

    delete req.body.createdAt;
    req.body.updatedAt = moment().toDate();

    req.body.blocked=false;

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
        }
    }
});
}

module.exports.RemoveAdmin=function(req, res, next){ // Removes the admin status of another user after checking the user trying to access this method is an admin

    if(!Validations.isObjectId(req.params.userId)){
        return res.status(422).json({
            err: null,
            msg: 'userId parameter must be a valid ObjectId',
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
        if(!user['admin']){
          return res.status(422).json({
            err: null,
            msg: 'Unauthorized! You are not an admin.',
            data: null
          });
        }else{
    delete req.body.createdAt;
    req.body.updatedAt = moment().toDate();

    req.body.admin=false;

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
        }
    }
});
}
//--------------------------------------------------------------------------------------------------------------
module.exports.removeCompany = function(req, res, next) {  // Delete a company after checking the ID given.
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




module.exports.getCompanies = function(req, res, next) { //Viewing companies after checking that the user is an admin returns all companies

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
module.exports.viewAllReports = function(req, res, next) {
req.body.userid = req["headers"]["id"];
User.findById(req.body.userid).exec(function(err,user){
    if(err){
        return next(err)
    }else{
        if(!user){
            return res.status(422).json({
                err: null,
                msg: 'Admin not found.',
                data: null
            });
        }
        if(user["admin"]){
            Report.find({}).exec(function(err, reports) {
                if (err) {
                    return next(err);
                }
                res.status(200).json({
                    err: null,
                    msg: 'Reports retrieved successfully.',
                    data: reports
                });
            });
        }
        if(!user["admin"]){
            return res.status(422).json({
                err: null,
                msg: 'Admin not found.',
                data: null
            });
        }
    }
});

};
module.exports.getTags = function(req, res, next) { // viewing the tags of a particular user
    if (!Validations.isObjectId(req.params.userId)) {
        return res.status(422).json({
            err: null,
            msg: 'userId parameter must be a valid ObjectId.',
            data: null
        });
    }
    User.findById(req.params.userId).exec(function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res
                .status(404)
                .json({ err: null, msg: 'User not found.', data: null });
        }
        res.status(200).json({
            err: null,
            msg: 'User retrieved successfully.',
            data: user.tags
        });
    });
};

module.exports.getUsers = function(req, res, next) { // Get list of users by checking first that user is an admin then return all users
    req.body.userid = req["headers"]["id"];
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
        if(!user['admin']){
          return res.status(422).json({
            err: null,
            msg: 'Unauthorized! You are not an admin.',
            data: null
          });
        }else{
    User.find({}).exec(function(err, users) {
        if (err) {
            return next(err);
        }
        res.status(200).json({
            err: null,
            msg: 'Users retrieved successfully.',
            data: users
        });
    });
}
        }
    }
});
}

module.exports.getUserById = function(req, res, next) { // Viewing user profile first check user ID then check user is an admin

    if (!Validations.isObjectId(req.params.userId)) {
        return res.status(422).json({
            err: null,
            msg: 'userId parameter must be a valid ObjectId.',
            data: null
        });
    }
    req.body.userid = req["headers"]["id"];
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
        if(!user['admin']){
          return res.status(422).json({
            err: null,
            msg: 'Unauthorized! You are not an admin.',
            data: null
          });
        }else{
    User.findById(req.params.userId).exec(function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res
                .status(404)
                .json({ err: null, msg: 'User not found.', data: null });
        }
        res.status(200).json({
            err: null,
            msg: 'User retrieved successfully.',
            data: user
        });
    });
};
        }
    }
});
}
module.exports.addCompany = function(req, res, next) {      // Adding a company by checking input fields first then checking if the user is an admin then adding to DB

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

  Company.create(req.body, function(err, company) {
      if (err) {
          return res.status(422).json({
          err: null,
          msg: 'Failed',
          data: company
      });
      }
      return res.status(201).json({
          err: null,
          msg: 'Company was created successfully.',
          data: company
      });
  });
};
      }
    }
});
}

module.exports.viewCompanies = function(req, res, next) {  // Returning all companies
  Company.find({}).exec(function(err, company) {
    if (err) {
      return next(err);
    }
    return res.status(200).json({
      err: null,
      msg: 'Companies retrieved successfully.',
      data: company
    });
  });
};

