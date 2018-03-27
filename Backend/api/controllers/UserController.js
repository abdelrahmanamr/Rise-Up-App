var mongoose = require('mongoose'),
  moment = require('moment'),
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
        if(!password.length > 6){

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
                User.findOne({$or:[{email: req.body.email.trim().toLowerCase()},{username:req.body.username}]}).exec(function(err,user){
                    if(err){
                        console.log("error");
                        return next(err);
                    }
                    else{
                        if(user){
                            console.log(user.username);
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