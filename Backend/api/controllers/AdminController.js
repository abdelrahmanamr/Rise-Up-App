var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/Validations'),
  User = mongoose.model('User'),
 Company = mongoose.model('Company'),
Content = mongoose.model('Content'),
Comment = mongoose.model('Comment');



module.exports.AddExpert=function(req, res, next){
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


module.exports.UpdateExpertTags=function(req, res, next){

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
module.exports.BlockUser=function(req, res, next){

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


module.exports.AddAdmin=function(req, res, next){

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


module.exports.RemoveExpert=function(req, res, next){

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

module.exports.UnblockUser=function(req, res, next){

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

module.exports.RemoveAdmin=function(req, res, next){

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
module.exports.removeCompany = function(req, res, next) {
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

// module.exports.addCompany = function(req, res, next) {
//     var valid =
//         req.body.userid &&
//         Validations.isObjectId(req.body.userid) &&
//         req.body.name &&
//         Validations.isString(req.body.name) &&
//         req.body.email &&
//         Validations.isString(req.body.email) &&
//         req.body.website &&
//         Validations.isString(req.body.website)&&
//         req.body.tags &&
//         Validations.isString(req.body.tags)&&
//         req.body.type &&
//         Validations.isString(req.body.type)
//     ;
//     if (!valid) {
//         return res.status(422).json({
//             err: null,
//             msg: 'name(String) , email(String) , website(String) , tags(String) and type(String) are required fields.',
//             data: null
//         });
//     }
//     req.body.userid = req["headers"]["id"];
//     User.findById(req.body.userid).exec(function(err,user) {
//         if(err){
//           return next(err);
//         }
//         else {
//           if(!user){
//           return res
//           .status(404)
//           .json({ err: null, msg: 'User not found,so you are un-authorized', data: null });
//         }else{
//         if(!user['admin']){
//           return res.status(422).json({
//             err: null,
//             msg: 'Unauthorized! You are not an admin.',
//             data: null
//           });
//         }else{
//     // Security Check
//     delete req.body.createdAt;
//     delete req.body.updatedAt;

//     Company.create(req.body, function(err, company) {    
//         if (err) {
//             return next(err);
//         }
//         res.status(201).json({
//             err: null,
//             msg: 'Company was created successfully.',
//             data: company
//         });
//     });
// };
//         }
//     }
// });
// }


module.exports.getCompanies = function(req, res, next) {

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
module.exports.getTags = function(req, res, next) {
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

module.exports.getUsers = function(req, res, next) {
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

module.exports.getUserById = function(req, res, next) {
    
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
module.exports.addCompany = function(req, res, next) {

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

module.exports.viewCompanies = function(req, res, next) {
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