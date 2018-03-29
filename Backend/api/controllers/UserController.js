var mongoose = require('mongoose'),
  moment = require('moment'),
  jwt = require('jsonwebtoken'),
  Validations = require('../utils/Validations'),
  Encryption = require('../utils/Encryption')
  User = mongoose.model('User');


module.exports.register = function(req,res,next){
    var valid =
    req.body.email &&
    Validations.isString(req.body.email) &&
    req.body.password &&
    Validations.isString(req.body.password) &&
    req.body.confirmPassword &&
    Validations.isString(req.body.confirmPassword);
    if(!valid){
        return res.status(422).json({
            err:null,
            msg:'Wrong input data',
            data:null
        });
    }else{
        var password = req.body.password.trim();
        if(password.length < 6){

            return res.status(422).json({
                err:null,
                msg:"Password doesn't meent length requirements",
                data:null
            });
        }else{
            if(password !== (req.body.confirmPassword.trim())){
                return res.status(422).json({
                    err: null,
                    msg: 'password and confirmPassword does not match.',
                    data: null
                  });
            }else{
                console.log("passwords match");
                User.findOne({$or:[{email: req.body.email.trim().toLowerCase()},{username:req.body.username.trim().toLowerCase()}]}).exec(function(err,user){
                    if(err){
                        console.log("error");
                        return next(err);
                    }
                    else{
                        if(user){
                            if(user.username==req.body.username.trim().toLowerCase()){
                                return res.status(422).json({
                                    err: null,
                                    msg: 'A user already exists with the same username',
                                    data: null
                                  });
                            }else{
                            return res.status(422).json({
                                err: null,
                                msg: 'A user already exists with the same email',
                                data: null
                              });
                            }
                        }
                        delete req.body.createdAt;
                        delete req.body.updatedAt;

                        Encryption.hashPassword(req.body.password,function(err,hash){
                                if(err){
                                    return next(err);
                                }
                                password = hash;
                                req.body.password = hash;

                          User.create(req.body, function(err, newUser) {
                                if (err) {
                                 return next(err);
                                    }
                                    res.status(201).json({
                                        err: null,
                                        msg: 'Registration successful, you can now login to your account.',
                                        data: newUser.toObject()
                                      });

                        });

                        
                    })
                    ;
                };
            });
        };
    }
    };
};

module.exports.checkUsername = function(req, res, next){
    var valid = req.body.username &&
        Validations.isString(req.body.username);
    if (!valid){
        return res.status(422).json({
            err:null,
            msg:"Please enter a valid username",
            data:null
        });
    }
    else {
        toCheck = req.body.username.trim().toLowerCase();
         User.findOne({username:toCheck}).exec(function(err,userfound){
            if(err){
                console.log("found an error");
                return next(err);
            }
            else {
                if(userfound){
                    return res.status(422).json({
                        err: null,
                        msg: "user already exists",
                        data: null
                    });
                }
                else {
                     return res.status(200).json({
                        err: null,
                        msg: "user unique",
                        data: null
                    });
                }
            }
    });
}
}

module.exports.login = function(req,res,next){
    var valid =
    ((req.body.email &&
    Validations.isString(req.body.email)) ||(req.body.username &&
        Validations.isString(req.body.username))) &&
    req.body.password &&
    Validations.isString(req.body.password);
    if(!valid){
        return res.status(422).json({
            err:null,
            msg:"Wrong input data",
            data:null
        });
    }
    else{
        console.log("Checking all database entries for an entry like this");
        var toCheck = null;
        if(req.body.email==null){
            toCheck = req.body.username.trim().toLowerCase();
        }else{
            toCheck = req.body.email.trim().toLowerCase()
        }
        User.findOne({$or:[{email:toCheck},{username:toCheck}]}).exec(function(err,userfound){
            if(err){
                console.log("I found an error");
                return next(err);
            }

            else{

                if(!userfound){
                    console.log("No user found");

                    return res.status(422).json({
                        err:null,
                        msg:"No user with this username/email was found",
                        data:null
                    });
                }
                else{
                    console.log("Comparing passwords");
                    // console.log(req.body.password.trim().toLowerCase());
                    // console.log(userfound.password);
                    // Encryption.hashPassword(req.body.password.trim().toLowerCase(), function(err, password) {
                    //     console.log(password);
                    // })
                    Encryption.comparePasswordToHash(req.body.password,userfound.password,function(err,passMatched){
                        if(err){
                            console.log("I found an error2");
                            return next(err);
                        }
                        else{
                            if(!passMatched){
                                return res.status(422).json({
                                    err:null,
                                    msg:"Wrong password",
                                    data:null
                                });
                            }
                            else{
                                var token = jwt.sign(
                                    {
                                    user:userfound.toObject()
                                  },
                                  req.app.get('secret'),
                                  {
                                      expiresIn: '12h'
                                  }
                            );
                            res.status(200).json({
                                err:null,
                                msg:"Login sucessfull",
                                data:token
                            })
                            }
                        }
                    });
                }
            }
        });
    }
}